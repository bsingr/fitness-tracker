const {
  readFile,
  writeFile,
  unlinkFile,
  mkdir
} = require('../src/fsPromise');

module.exports = dataPath => {
  // all runs
  const runsPath = dataPath + '/' + 'runs.json';
  const readRuns = () => {
    return readFile(runsPath).then(data => JSON.parse(data));
  }
  const writeRuns = runs => writeFile(runsPath, JSON.stringify(runs, null, 2));

  // single run
  const runPath = runId => dataPath + '/runs/' + runId;
  const runLocationsPath = runId => runPath(runId) + '/locations.json';
  const runGeojsonPath = runId => runPath(runId) + '/locations.geojson';
  const readRunLocations = (runId) => {
    return readFile(runLocationsPath(runId)).then(data => JSON.parse(data));
  }
  const writeRunLocations = (runId, locations) => {
    return writeFile(runLocationsPath(runId), JSON.stringify(locations));
  }
  const writeRunGeojson = (runId, geojson) => {
    return writeFile(runGeojsonPath(runId), JSON.stringify(geojson));
  }

  return {
    readRuns,
    writeRuns,
    runPath,
    runLocationsPath,
    runGeojsonPath,
    readRunLocations,
    writeRunLocations,
    writeRunGeojson
  }
}
