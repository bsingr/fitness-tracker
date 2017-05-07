const runMilestones = require('../../src/runMilestones');
const {expect} = require('chai');
const constanceStaadLocations = require('../resources/runs/constance-staad/locations.json');
describe('runMilestones', () => {
  it('builds', () => {
    const milestones = runMilestones(constanceStaadLocations);
    expect(milestones.map(m => m.distance)).to.eql([
      0,
      2.040603792654323,
      2.041978511971449,
      2.0346892820579865,
      2.038783522069694
    ])
  })
})
