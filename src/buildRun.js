const runGeodistance = require('./runGeodistance');
const runDuration = require('./runDuration');

const buildRun = (runId, locations) => {
  return {
    id: runId,
    distance: runGeodistance(locations),
    time: runDuration(locations),
    route: [
      "3-LÄNDER-HALBMARATHON",
      "Lindau",
      "Bregenz"
    ],
    struggle: 5
  }
}

module.exports = buildRun;
