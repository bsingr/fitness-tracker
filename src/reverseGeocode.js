const axios = require('axios');
const low = require('lowdb');
const cache = low('./geocode-cache.json');
cache.defaults({urls: []}).write()

const reverseGeocode = ({lat, lng}) => {
  if (!lat || !lng) {
    return Promise.reject(new Error(`Invalid coordinates lat=${lat} lng=${lng}`))
  }
  const url = `http://nominatim.openstreetmap.org/reverse?format=json&lat=${lat.toFixed(3)}&lon=${lng.toFixed(3)}&zoom=18`
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
