import React from 'react'
import PropTypes from 'prop-types'
import Heading from './Heading'
import Distance from '../Distance'
import Pace from '../Pace'
import Intensity from '../Intensity'
import Time from '../Time'
import './style.css'
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'

const Run = ({run, runGeojson, mapboxToken}) => {
  let map;
  if (runGeojson) {
    map = (
      <div className="run__widget">
        <Map
          center={run.center}
          zoom={10}
          zoomControl={false}
          attributionControl={false}
          style={{height: '100%'}}
          >
          <TileLayer
            url={`https://b.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}@2x.png?access_token=${mapboxToken}`}
            />
            <GeoJSON data={runGeojson} />
        </Map>
      </div>
    )
  }
  return (
    <div className='run'>
      <Heading date={run.date} route={run.route} />
      <Distance actualValue={run.distance} targetValue={run.targetDistance} />
      <Pace actualValue={run.pace} targetValue={run.targetPace} />
      <Time actualValue={run.time} targetValue={run.targetTime} estimatedValue={run.estimatedTime} />
      <Intensity percentValue={run.intensity} />
      {map}
    </div>
  )
}

Run.propTypes = {
  run: PropTypes.shape({
    targetPace: PropTypes.number.isRequired,
    pace: PropTypes.number.isRequired,
    intensity: PropTypes.number.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    distance: PropTypes.number.isRequired,
    estimatedTime: PropTypes.number.isRequired,
    route: PropTypes.array.isRequired
  }),
  runGeojson: PropTypes.object,
  mapboxToken: PropTypes.string.isRequired
}

module.exports = Run
