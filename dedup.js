const fs = require('fs');
const flatten = require('lodash.flatten');
const uniqby = require('lodash.uniqby');

const INBOX_PATH='./inbox';

fs.readdir(INBOX_PATH, (err, paths) => {
  if (err) throw err;
  if (paths.length === 0) {
    console.log('NOOP: inbox is empty')
  } else if (paths.length === 1) {
    console.log('NOOP: inbox is already deduped')
  }
  Promise.all(paths.map(path => {
    return new Promise((resolve, reject) => {
      fs.readFile(INBOX_PATH + '/' + path, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }))
  .then(datas => datas.map(data => JSON.parse(data)))
  .then(flatten)
  .then(data => uniqby(data, r => r.uuid))
  .then(data => new Promise((resolve, reject) => {
    fs.writeFile(INBOX_PATH + '/' + (new Date().toISOString()) + '.json', JSON.stringify(data), (err) => {
      if (err) return reject(err);
      resolve();
    });
  }))
  .then(() => {
    Promise.all(paths.map(path => {
      return new Promise((resolve, reject) => {
        fs.unlink(INBOX_PATH + '/' + path, (err, data) => {
          if (err) return reject(err);
          resolve(data);
        });
      });
    }))
  })
  .catch(console.error)
});
