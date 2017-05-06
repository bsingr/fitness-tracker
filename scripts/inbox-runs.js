const {
  readFile,
  unlinkFile,
  mkdir
} = require('../src/fsPromise');

const INBOX_PATH='./inbox-runs';
const DATA_DIR='./data';

const readInbox = require('../src/readInbox');
const {
  readRuns,
  writeRuns,
  runPath,
  writeRunLocations,
  writeRunGeojson
} = require('../src/data')(DATA_DIR);
const buildGeojson = require('../src/buildGeojson');
const buildRun = require('../src/buildRun');

readRuns()
.then(runs => {
  return readInbox(INBOX_PATH)
  .then(inboxRuns => {
    console.log(`Importing ${inboxRuns.length} files from ${INBOX_PATH}`);
    return Promise.all(inboxRuns.map(inboxRun => {
      return readFile(inboxRun.path)
      .then(data => {
        const locations = JSON.parse(data);
        const runId = inboxRun.id;
        return buildRun(runId, locations).then(run => {
          runs[runId] = run;
          return mkdir(runPath(runId))
          .then(() => Promise.all([
            writeRunLocations(runId, locations),
            writeRunGeojson(runId, buildGeojson(locations))
          ]))
        });
      })
      .then(() => unlinkFile(inboxRun.path))
    }))
  })
  .then(() => writeRuns(runs))
})
.catch(console.error)
