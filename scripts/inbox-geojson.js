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
    console.log('GEOJSON: using inbox file')
  } else {
    console.log(`GEOJSON: using only first of ${paths.length} files`)
  }
  new Promise((resolve, reject) => {
    fs.readFile(INBOX_PATH + '/' + paths[0], (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  })
  .then(data => JSON.parse(data))
  .then(data => {
    return {
      "type": "LineString",
      "coordinates": data.map(r => {
        return [r.coords.longitude, r.coords.latitude]
      })
    }
  })
  .then(data => new Promise((resolve, reject) => {
    fs.writeFile('track.geojson', JSON.stringify(data), (err) => {
      if (err) return reject(err);
      resolve();
    });
  }))
  .catch(console.error)
});
