const {runGeodistance} = require('../../src/runGeodistance');
const {expect} = require('chai');
const constanceStaadLocations = require('../resources/runs/constance-staad/locations.json');
describe('runGeodistance', () => {
  it('builds', () => {
    expect(runGeodistance(constanceStaadLocations)).to.eql(10.167357026019097)
  })
})
