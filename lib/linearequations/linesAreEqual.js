const assert = require('assert');
const Line = require('./Line');
const hyperplanesAreEqual = require('./hyperplanesAreEqual');

function linesAreEqual (lineA, lineB, tolerance) {
  assert(lineA instanceof Line && lineB instanceof Line);
  return hyperplanesAreEqual(lineA, lineB, tolerance);
}

module.exports = linesAreEqual;
