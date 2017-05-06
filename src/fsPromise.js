const fs = require('fs');

const readFile = path => new Promise((resolve, reject) => {
  fs.readFile(path, (err, data) => {
    if (err) return reject(err);
    resolve(data);
  });
});
const writeFile = (path, data) => new Promise((resolve, reject) => {
  fs.writeFile(path, data, (err) => {
    if (err) return reject(err);
    resolve();
  });
})
const unlinkFile = (path) => new Promise((resolve, reject) => {
  fs.unlink(path, (err, data) => {
    if (err) return reject(err);
    resolve(data);
  });
});
const readDir = (path) => new Promise((resolve, reject) => {
  fs.readdir(path, (err, paths) => {
    if (err) return reject(err);
    resolve(paths);
  });
});
const mkdir = (path) => new Promise((resolve, reject) => {
  fs.stat(path, (err, stats) => {
    if (err) {
      fs.mkdir(path, (err) => {
        if (err) return reject(err);
        resolve();
      })
    } else {
      if (stats.isDirectory()) {
        return resolve();
      } else {
        return reject(new Error(path + ' already exists but is not a directory'))
      }
    }
  })
});

module.exports = {
  readFile,
  writeFile,
  unlinkFile,
  readDir,
  mkdir
};
