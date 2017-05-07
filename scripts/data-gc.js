const {unlinkFile} = require('../src/fsPromise');
const DATA_DIR='./data';
const {
  readRuns,
  writeRuns,
  removeRunGeojson,
  removeRunLocations
} = require('../src/data')(DATA_DIR);

readRuns()
.then(runs => {
  return Promise.all(Object.keys(runs).map(runId => {
    const run = runs[runId];
    if (run.distance < 0.5 || run.time < 5 || run.manualDelete) {
      console.log(`INFO: Remove ${runId} with distance=${run.distance} time=${run.time} manualDelete=${run.manualDelete}`)
      delete runs[runId]
      return Promise.all([
        removeRunGeojson(runId),
        removeRunLocations(runId)
      ]);
    } else {
      console.log(`INFO: Keep ${runId} with distance=${run.distance} time=${run.time}`)
      Promise.resolve();
    }
  }))
  .then(() => writeRuns(runs));
})
.catch(console.error)
