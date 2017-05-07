const runDuration = require('./runDuration');
const {expect} = require('chai');
const constanceStaadLocations = require('./test-resources/runs/constance-staad/locations.json');
describe('runDuration', () => {
  it('returns duration in minutes', () => {
    expect(runDuration(constanceStaadLocations)).to.eql(60.80501666666667)
  })
})
