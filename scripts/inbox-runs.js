const fs = require('fs');
const {basename, extname} = require('path');
const flatten = require('lodash.flatten');
const uniqby = require('lodash.uniqby');
const geodistance = require('../src/geodistance');

const INBOX_PATH='./inbox-runs';
const DATA_DIR='./data';

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
  fs.unlink(INBOX_PATH + '/' + path, (err, data) => {
    if (err) return reject(err);
    resolve(data);
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
})

const runsPath = DATA_DIR + '/' + 'runs.json';
const readRuns = () => {
  return readFile(runsPath).then(data => JSON.parse(data));
}
const writeRuns = runs => writeFile(runsPath, JSON.stringify(runs, null, 2));

const runPath = runId => DATA_DIR + '/runs/' + runId;
const runLocationsPath = runId => runPath(runId) + '/locations.json';
const runGeojsonPath = runId => runPath(runId) + '/locations.geojson';

const calculateDistance = run => {
  let distance = 0;
  let previousLocation;
  run.forEach((currentLocation, idx) => {
    if (previousLocation) {
      distance = distance + geodistance(
        previousLocation.coords.latitude,
        previousLocation.coords.longitude,
        currentLocation.coords.latitude,
        currentLocation.coords.longitude
      )
    }
    previousLocation = currentLocation;
  })
  return distance;
}

fs.readdir(INBOX_PATH, (err, paths) => {
  if (err) throw err;
  if (paths.length === 0) {
    console.log('NOOP: inbox is empty')
    return;
  } else if (paths.length === 1) {
    console.log('NOOP: inbox is already deduped')
    // return;
  } else {
    console.log(`RUNS: creating ${paths.length} runs`)
  }
  readRuns()
  .then(runs => {
    return Promise.all(paths.map(path => {
      const runId = basename(path, extname(path));
      return readFile(INBOX_PATH + '/' + path)
        .then(data => {
          const run = JSON.parse(data);
          runs[runId] = {
            id: runId,
            distance: calculateDistance(run)
          };
          return mkdir(runPath(runId))
          .then(() => Promise.all([
            writeFile(runLocationsPath(runId), data),
            writeFile(runGeojsonPath(runId), JSON.stringify({
              "type": "LineString",
              "coordinates": run.map(r => [r.coords.longitude, r.coords.latitude])
            }))
          ]))
        })
        .then(() => unlinkFile(path))
    }))
    .then(() => writeRuns(runs))
  })
  .catch(console.error)
});
