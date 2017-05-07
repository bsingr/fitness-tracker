const {runGeodistance} = require('./runGeodistance');
const {expect} = require('chai');
const constanceStaadLocations = require('./test-resources/runs/constance-staad/locations.json');
describe('runGeodistance', () => {
  it('returns distance', () => {
    expect(runGeodistance(constanceStaadLocations)).to.eql(10.167357026019097)
  })
})
