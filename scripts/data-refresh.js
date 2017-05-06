const {mkdir} = require('../src/fsPromise');
const DATA_DIR='./data';
const {
  readRuns,
  writeRuns,
  runPath,
  readRunLocations,
  writeRunGeojson
} = require('../src/data')(DATA_DIR);
const buildGeojson = require('../src/buildGeojson');
const buildRun = require('../src/buildRun');

readRuns()
.then(runs => {
  return Promise.all(Object.keys(runs).map(runId => {
    const run = runs[runId];
    return readRunLocations(runId)
    .catch(err => {
      console.log(`INFO: No locations for run ${runId} (err = ${err})`);
      return [];
    })
    .then(locations => {
      if (locations.length === 0) {
        return Promise.resolve();
      }
      console.log(`INFO: Rewrite ${runId} from ${locations.length} locations`);
      return buildRun(runId, locations).then(run => {
        runs[runId] = run;
        return mkdir(runPath(runId))
        .then(() => Promise.all([
          writeRunGeojson(runId, buildGeojson(locations))
        ]))
      });
    })
  }))
  .then(() => writeRuns(runs));
})
.catch(console.error)
