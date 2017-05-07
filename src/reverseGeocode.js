const axios = require('axios');

const reverseGeocode = ({lat, lng}) => {
  return axios.get(`http://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18`)
  .then(res => res.data)
}

module.exports = reverseGeocode;
