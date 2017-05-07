const runMilestones = require('../../src/runMilestones');
const {expect} = require('chai');
const constanceStaadLocations = require('../resources/runs/constance-staad/locations.json');
describe('runMilestones', () => {
  it('builds', () => {
    const milestones = runMilestones(constanceStaadLocations);
    expect(milestones.map(m => m.distance)).to.eql([
      0,
      1.020402523904196,
      1.020201268750127,
      1.026214408440719,
      1.0269092173169403,
      1.0290396574598266,
      1.0196463937924867,
      1.0167871219027014,
      1.0181449898311405,
      1.0170725288601286
    ])
  })
})
