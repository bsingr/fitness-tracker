const runGeodistance = require('./runGeodistance');
const runDuration = require('./runDuration');
const flatten = require('lodash.flatten');
const uniqby = require('lodash.uniqby');
const axios = require('axios');

const reverseGeocode = ({lat, lng}) => {
  return axios.get(`http://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18`)
  .then(res => res.data)
}
const latLngFromLocation = location => ({
  lat: location.coords.latitude,
  lng: location.coords.longitude
});

// address properties: park, bus_stop, path, road, suburb, town
const buildRoute = addresses => {
  let route = [];
  const towns = uniqby(addresses.map(a => a.town))
  const miscs = uniqby(addresses.map(a => a.park || a.bus_stop || a.suburb || a.path || a.road))
  if (towns.length > 1) {
    route = route.concat(towns)
  } else {
    if (miscs.length > 1) {
      route = route.concat(miscs);
    } else {
      route = route.concat(miscs);
    }
    route = route.concat(towns)
  }
  return route;
}

const buildRun = (runId, locations) => {
  return Promise.all([
    reverseGeocode(latLngFromLocation(locations[0])),
    reverseGeocode(latLngFromLocation(locations[(locations.length/2).toFixed(0)])),
    reverseGeocode(latLngFromLocation(locations[locations.length - 1]))
  ]).then(geoinfos => {
    return {
      id: runId,
      distance: runGeodistance(locations),
      time: runDuration(locations),
      route: buildRoute(geoinfos.map(g => g.address)),
      struggle: 5
    }
  })
}

module.exports = buildRun;
