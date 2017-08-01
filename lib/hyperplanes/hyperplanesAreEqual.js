const assert = require('assert');
const Hyperplane = require('./Hyperplane');
const hyperplanesAreParallel = require('./hyperplanesAreParallel');
const basePoint = require('./basePoint');
const subtractVectors = require('../vectors/subtract');
const vectorsAreOrthogonal = require('../vectors/vectorsAreOrthogonal');

function hyperplanesAreEqual (hyperplaneA, hyperplaneB, tolerance) {
  assert(
    hyperplaneA instanceof Hyperplane &&
    hyperplaneB instanceof Hyperplane
  );
  if (!hyperplanesAreParallel(hyperplaneA, hyperplaneB, tolerance)) {
    return false;
  }
  const connectingVector = subtractVectors(
    hyperplaneA.coefficients.length,
    basePoint(hyperplaneA),
    basePoint(hyperplaneB)
  );
  return (
    // coefficient arrays function as normal vectors
    vectorsAreOrthogonal(connectingVector, hyperplaneA.coefficients, tolerance) &&
    vectorsAreOrthogonal(connectingVector, hyperplaneB.coefficients, tolerance)
  );
}

module.exports = hyperplanesAreEqual;
