const axios = require('axios');
const low = require('lowdb');
const cache = low('./geocode-cache.json');
cache.defaults({urls: []}).write()

const reverseGeocode = ({lat, lng}) => {
  const url = `http://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18`;
  const cachedData = cache.get('urls').find({url}).value();
  if (cachedData) {
    return Promise.resolve(cachedData.data);
  } else {
    return axios.get(url)
    .then(res => res.data)
    .then(data => {
      cache.get('urls').push({url, data}).write();
      return data;
    })
  }
}

module.exports = reverseGeocode;
