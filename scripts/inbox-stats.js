const fs = require('fs');
const flatten = require('lodash.flatten');
const uniqby = require('lodash.uniqby');

const INBOX_PATH='./inbox';

fs.readdir(INBOX_PATH, (err, paths) => {
  if (err) throw err;
  if (paths.length === 0) {
    console.log('NOOP: inbox is empty')
    return;
  } else if (paths.length === 1) {
    console.log('STATS: using inbox file')
  } else {
    console.log(`STATS: using only first of ${paths.length} files`)
  }
  new Promise((resolve, reject) => {
    fs.readFile(INBOX_PATH + '/' + paths[0], (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  })
  .then(data => JSON.parse(data))
  .then(data => {
    const total = data.length;
    const isMoving = data.filter(r => r.is_moving === true).length
    const zeroSpeed = data.filter(r => r.coords.speed === 0).length
    const activities = data.reduce((activities, r) => {
      if (!activities[r.activity.type]) {
        activities[r.activity.type] = 0;
      }
      activities[r.activity.type]++;
      return activities;
    }, {});
    return {
      total: total,
      speed: {
        zero: zeroSpeed,
        more: total - zeroSpeed
      },
      is_moving: {
        false: total - isMoving,
        true: isMoving
      },
      activities
    }
  })
  .then(data => new Promise((resolve, reject) => {
    console.log(data)
    fs.writeFile('stats.json', JSON.stringify(data, null, 2), (err) => {
      if (err) return reject(err);
      resolve();
    });
  }))
  .catch(console.error)
});
