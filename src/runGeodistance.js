const geodistance = require('./geodistance');

const runGeodistances = locations => {
  let previousLocation;
  return locations.map((currentLocation, idx) => {
    let distance = 0;
    if (previousLocation) {
      distance = distance + geodistance(
        previousLocation.coords.latitude,
        previousLocation.coords.longitude,
        currentLocation.coords.latitude,
        currentLocation.coords.longitude
      )
    }
    previousLocation = currentLocation;
    return distance;
  })
}
const runGeodistance = locations => {
  return runGeodistances(locations).reduce((total, intermediate) => {
    return total + intermediate;
  }, 0);
}
module.exports = {
  runGeodistances,
  runGeodistance
};
