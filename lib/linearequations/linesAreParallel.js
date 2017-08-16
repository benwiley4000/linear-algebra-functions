const assert = require('assert');
const Line = require('./Line');
const hyperplanesAreParallel = require('./hyperplanesAreParallel');

function linesAreParallel (lineA, lineB, tolerance) {
  assert(lineA instanceof Line && lineB instanceof Line);
  return hyperplanesAreParallel(lineA, lineB, tolerance);
}

module.exports = linesAreParallel;
