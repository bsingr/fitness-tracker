const {runGeodistances, runGeodistance} = require('./runGeodistance')
const runMilestones = (locations) => {
  let totalDistance = runGeodistance(locations);
  let intermediateDistance = 0;
  return runGeodistances(locations).reduce((milestones, localDistance, idx) => {
    intermediateDistance = intermediateDistance + localDistance;
    if (intermediateDistance > (totalDistance/5)) { // take if distance to previous is > 1/5 of total distance
      milestones.push({
        distance: intermediateDistance,
        location: locations[idx]
      });
      intermediateDistance = 0;
    }
    return milestones;
  }, [{
    distance: 0,
    location: locations[0]
  }]) // take initial
}
module.exports = runMilestones;
