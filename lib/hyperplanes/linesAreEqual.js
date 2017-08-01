const Line = require('./Line');
const linesAreParallel = require('./linesAreParallel');
const basePoint = require('./basePoint');
const subtractVectors = require('../vectors/subtract');
const vectorsAreOrthogonal = require('../vectors/vectorsAreOrthogonal');
const assert = require('assert');

function linesAreEqual (lineA, lineB, tolerance) {
  assert(lineA instanceof Line && lineB instanceof Line);
  if (!linesAreParallel(lineA, lineB, tolerance)) {
    return false;
  }
  const connectingVector = subtractVectors(2, basePoint(lineB), basePoint(lineA));
  return (
    // coefficient arrays function as normal vectors
    vectorsAreOrthogonal(connectingVector, lineA.coefficients, tolerance) &&
    vectorsAreOrthogonal(connectingVector, lineB.coefficients, tolerance)
  );
}

module.exports = linesAreEqual;
