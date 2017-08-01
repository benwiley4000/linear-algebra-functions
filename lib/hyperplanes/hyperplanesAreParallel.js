const assert = require('assert');
const Hyperplane = require('./Hyperplane');
const vectorsAreParallel = require('../vectors/vectorsAreParallel');

function hyperplanesAreParallel (hyperplaneA, hyperplaneB, tolerance) {
  assert(
    hyperplaneA instanceof Hyperplane &&
    hyperplaneB instanceof Hyperplane
  );
  // coefficient arrays function as normal vectors
  return vectorsAreParallel(
    hyperplaneA.coefficients,
    hyperplaneB.coefficients,
    tolerance
  );
}

module.exports = hyperplanesAreParallel;
