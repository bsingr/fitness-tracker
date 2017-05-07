const {mkdir} = require('../src/fsPromise');
const DATA_DIR='./data';
const {
  readRuns,
  writeRuns,
  runPath,
  readRunLocations,
  writeRunLocations,
  writeRunGeojson
} = require('../src/data')(DATA_DIR);
const buildGeojson = require('../src/buildGeojson');
const buildRun = require('../src/buildRun');
const runLocation = require('../src/runLocation');

readRuns()
.then(runs => {
  return Promise.all(Object.keys(runs).map(runId => {
    const run = runs[runId];
    return readRunLocations(runId)
    .catch(err => {
      console.log(`INFO: No locations for run ${runId} (err = ${err})`);
      return [];
    })
    .then(rawLocations => {
      const locations = rawLocations.map(runLocation);
      if (locations.length === 0) {
        return Promise.resolve();
      }
      return buildRun(runId, locations).then(run => {
        console.log(`INFO: Rewrite ${runId} from ${locations.length} locations (distance=${run.distance} duration=${run.time})`);
        runs[runId] = run;
        return mkdir(runPath(runId))
        .then(() => Promise.all([
          writeRunLocations(runId, locations),
          writeRunGeojson(runId, buildGeojson(locations))
        ]))
      });
    })
  }))
  .then(() => writeRuns(runs));
})
.catch(console.error)
