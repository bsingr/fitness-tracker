const buildRun = require('../../src/buildRun');
const {expect} = require('chai');
describe('buildRun', () => {
  it('builds', () => {
    expect(buildRun('foo', [
      {
        timestamp: '2017-05-05T06:42:40.861Z',
        coords: {
          "longitude":9.157927315154557,
          "latitude":47.6718976090051
        }
      },
      {
        timestamp: '2017-05-05T06:52:41.861Z',
        coords: {
          "longitude":9.153927314134567,
          "latitude":47.6718976090341
        }
      }
    ])).to.eql({
      "distance": 0.2995037060109473,
      "time": 10.016666666666667,
      "id": "foo",
      "route": [
        "3-LÄNDER-HALBMARATHON",
        "Lindau",
        "Bregenz"
      ],
      "struggle": 5
    })
  })
})
