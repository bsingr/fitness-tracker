const geodistance = require('./geodistance');
const {expect} = require('chai');
describe('geodistance', () => {
  it('returns distance in kilometers', () => {
    expect(geodistance(
      47.66665534586429, 9.179796986290421,
      47.68168745101213, 9.211713932463164
    )).to.eql(2.9162624883000547)
  })
})
