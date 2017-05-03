import React, { Component } from 'react';
const Page = require('./components/Page')
const config = require('./config')
const runify = require('./lib/runify')
import './App.css'

const runs = [{
  "date": "2016-10-09T11:15+02:00",
  "distance": 21.1,
  "time": 113,
  "route": [
    "3-LÄNDER-HALBMARATHON",
    "Lindau",
    "Bregenz"
  ],
  "struggle": 5
}]

class App extends Component {
  render() {
    return (
      <Page fetchRuns={() => Promise.resolve(runs.map(run => runify(run, config.target)))} />
    );
  }
}

export default App;
