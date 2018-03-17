// Must have at least one test file in this directory or Mocha will throw an error.
var assert = require('assert')

describe('dummy', () => {
    it('allows to launch project without tests present', () => {
        assert.equal(0, 0)
    })
})
