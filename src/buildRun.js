const runGeodistance = require('./runGeodistance');
const runDuration = require('./runDuration');
const uniqby = require('lodash.uniqby');
const reverseGeocode = require('./reverseGeocode');
const geocenter = require('./geocenter');

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
    route = route.concat(towns);
  }
  return route;
}

const mostSeperatedLocations = (locations) => {
  return [
    locations[0],
    locations[parseInt((locations.length/2).toFixed(0), 10)],
    locations[locations.length - 1]
  ]
}

const buildGeoinfos = locations => new Promise((resolve, reject) => {
  Promise.all(locations.map(l => reverseGeocode({
    lat: l.coords.latitude,
    lng: l.coords.longitude
  })))
  .then(resolve)
  .catch(reject)
})

const buildRun = (runId, locations) => {
  return buildGeoinfos(mostSeperatedLocations(locations))
  .catch(err => {
    return [] // ignore errors
  })
  .then(geoinfos => {
    return {
      id: runId,
      distance: runGeodistance(locations),
      time: runDuration(locations),
      route: buildRoute(geoinfos.map(g => g.address)),
      center: geocenter(locations.map(l => [l.coords.latitude, l.coords.longitude])),
      struggle: 5
    }
  })
}

module.exports = buildRun;
