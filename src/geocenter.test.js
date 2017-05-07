const geocenter = require('./geocenter');
const {expect} = require('chai');
const constanceStaadLocations = require('./test-resources/runs/constance-staad/locations.json');
describe('geocenter', () => {
  it('returns longitude and latitude', () => {
    const center = geocenter(constanceStaadLocations.map(l => [l.latitude, l.longitude]))
    expect(center).to.eql([
      47.668861188303744,
      9.20458978790292
    ])
  })
})
