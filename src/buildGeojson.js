const buildGeojson = (locations) => {
  return {
    "type": "LineString",
    "coordinates": locations.map(r => [r.coords.longitude, r.coords.latitude])
  };
}
module.exports = buildGeojson;
