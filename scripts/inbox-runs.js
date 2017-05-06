const fs = require('fs');
const {basename, extname} = require('path');
const moment = require('moment');
const flatten = require('lodash.flatten');
const uniqby = require('lodash.uniqby');
const geodistance = require('../src/geodistance');
const {
  readFile,
  writeFile,
  unlinkFile,
  mkdir
} = require('../src/files');

const INBOX_PATH='./inbox-runs';
const DATA_DIR='./data';

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

const calculateDuration = run => {
  const startTime = (new Date(run[0].timestamp));
  const endTime = (new Date(run[run.length - 1].timestamp));
  return moment.duration(moment(endTime).diff(startTime)).asMinutes();
}

fs.readdir(INBOX_PATH, (err, paths) => {
  if (err) {
    console.log(`NOOP: cannot read inbox ${err}`)
    return;
  }
  if (paths.length === 0) {
    console.log('NOOP: inbox is empty')
    return;
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
            distance: calculateDistance(run),
            time: calculateDuration(run),
            route: [
              "3-LÄNDER-HALBMARATHON",
              "Lindau",
              "Bregenz"
            ],
            struggle: 5
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
        .then(() => unlinkFile(INBOX_PATH + '/' + path))
    }))
    .then(() => writeRuns(runs))
  })
  .catch(console.error)
});
