const buildGeojson = (locations) => {
  return {
    "type": "LineString",
    "coordinates": locations.map(r => [r.longitude, r.latitude])
  };
}
module.exports = buildGeojson;
