import React, { Component } from 'react';
const Page = require('./components/Page')
const config = require('./config')
const runify = require('./lib/runify')
import axios from 'axios'
import './App.css'

const PUBLIC_URL = process.env.PUBLIC_URL;

const fetchRuns = url => () => {
  return axios.request({
    url
  })
  .then(res => {
    return res.data.map(run => runify(run, config.target))
  })
}

class App extends Component {
  render() {
    return (
      <Page fetchRuns={fetchRuns(PUBLIC_URL + '/api/runs.json')} />
    );
  }
}

export default App;
