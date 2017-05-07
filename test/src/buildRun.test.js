const buildRun = require('../../src/buildRun');
const {expect} = require('chai');
const constanceStaadLocations = require('../resources/runs/constance-staad/locations.json');
describe('buildRun', () => {
  it('builds', () => {
    return buildRun('constance-staad', constanceStaadLocations).then(run => {
      expect(run).to.eql({
        "distance": 10.167357026019097,
        "time": 60.80501666666667,
        "id": "constance-staad",
        "center": [
          47.668861188303744,
          9.20458978790292
        ],
        "route": [
          "Petershausen-Ost",
          "Staad",
          "Strandbad Horn",
          "Konstanz"
        ],
        "struggle": 5
      })
    })
  })
})
