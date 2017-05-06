const geodistance = require('./geodistance');

const runGeodistance = run => {
  let distance = 0;
  let previousLocation;
  run.forEach((currentLocation, idx) => {
    if (previousLocation) {
      distance = distance + geodistance(
        previousLocation.coords.latitude,
        previousLocation.coords.longitude,
        currentLocation.coords.latitude,
        currentLocation.coords.longitude
      )
    }
    previousLocation = currentLocation;
  })
  return distance;
}
module.exports = runGeodistance;
