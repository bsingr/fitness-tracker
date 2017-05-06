const fs = require('fs');
const {basename, extname} = require('path');
const moment = require('moment');
const flatten = require('lodash.flatten');
const uniqby = require('lodash.uniqby');
const runGeodistance = require('../src/runGeodistance');
const runDuration = require('../src/runDuration');
const {
  readFile,
  writeFile,
  unlinkFile,
  mkdir
} = require('../src/fsPromise');
const {readInbox} = require('../src/readInbox');

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

readRuns()
.then(runs => {
  readInbox(INBOX_PATH)
  .then(inboxRuns => {
    console.log(`Importing ${inboxRuns.length} files from ${INBOX_PATH}`);
    return Promise.all(inboxRuns.map(inboxRun => {
      return readFile(inboxRun.path)
      .then(data => {
        const run = JSON.parse(data);
        const runId = inboxRun.id;
        runs[runId] = {
          id: runId,
          distance: runGeodistance(run),
          time: runDuration(run),
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
      // .then(() => unlinkFile(INBOX_PATH + '/' + path))
    }))
  })
  .then(() => writeRuns(runs))
})
.catch(console.error)
