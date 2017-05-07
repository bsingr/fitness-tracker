import React, { Component } from 'react';
const Page = require('./components/Page')
const config = require('./config')
const runify = require('./lib/runify')
import axios from 'axios'
import sortby from 'lodash.sortby'
import './App.css'

const PUBLIC_URL = process.env.PUBLIC_URL;

const fetchRuns = url => () => {
  return axios.request({
    url
  })
  .then(res => {
    const runs = res.data;
    return sortby(
      Object.keys(runs).map(runId => runify(runs[runId], config.target))
      , run => run.date
    );
  })
}

const fetchRunGeojson = baseUrl => runId => {
  return axios.request({
    url: baseUrl + runId + '/locations.geojson'
  })
  .then(res => res.data);
}

class App extends Component {
  render() {
    return (
      <Page
        fetchRuns={fetchRuns(PUBLIC_URL + '/data/runs.json')}
        fetchRunGeojson={fetchRunGeojson(PUBLIC_URL + '/data/runs/')}
        mapboxToken={config.mapboxToken} />
    );
  }
}

export default App;
