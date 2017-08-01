const Line = require('./Line');
const vectorsAreParallel = require('../vectors/vectorsAreParallel');
const assert = require('assert');

function linesAreParallel (lineA, lineB, tolerance) {
  assert(lineA instanceof Line && lineB instanceof Line);
  // coefficient arrays function as normal vectors
  return vectorsAreParallel(lineA.coefficients, lineB.coefficients, tolerance);
}

module.exports = linesAreParallel;
