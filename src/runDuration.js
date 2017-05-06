const moment = require('moment');
const runDuration = run => {
  const startTime = (new Date(run[0].timestamp));
  const endTime = (new Date(run[run.length - 1].timestamp));
  return moment.duration(moment(endTime).diff(startTime)).asMinutes();
}
module.exports = runDuration;
