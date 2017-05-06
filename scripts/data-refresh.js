const fs = require('fs');
const {basename, extname} = require('path');
const moment = require('moment');
const flatten = require('lodash.flatten');
const uniqby = require('lodash.uniqby');
const {
  readFile,
  writeFile,
  unlinkFile,
  mkdir
} = require('../src/fsPromise');

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
    .then(locations => {
      console.log(`INFO: Rewrite ${runId} from ${locations.length} locations`);
      runs[runId] = buildRun(runId, locations);
      return mkdir(runPath(runId))
      .then(() => Promise.all([
        writeRunGeojson(runId, buildGeojson(locations))
      ]))
    })
    .catch(err => {
      console.log(`INFO: No locations for run ${runId} (err = ${err})`);
    })
  }))
  .then(() => writeRuns(runs));
})
.catch(console.error)
