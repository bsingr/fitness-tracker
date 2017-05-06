const {readDir} = require('./fsPromise');
const {basename, extname} = require('path');

const readInbox = inboxPath => {
  return readDir(inboxPath)
  .catch(() => [])
  .then(paths => {
    return paths.map(path => {
      return {
        id: basename(path, extname(path)),
        path: inboxPath + '/' + path
      };
    });
  });
};

module.exports = readInbox;
