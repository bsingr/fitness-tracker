const moment = require('moment');
const runDuration = locations => {
  const startTime = (new Date(locations[0].timestamp));
  const endTime = (new Date(locations[locations.length - 1].timestamp));
  return moment.duration(moment(endTime).diff(startTime)).asMinutes();
}
module.exports = runDuration;
