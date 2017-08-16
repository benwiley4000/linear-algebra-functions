const assert = require('assert');
const Hyperplane = require('./Hyperplane');
const isCloseToZero = require('../util/isCloseToZero');

function basePoint (hyperplane, tolerance) {
  assert(hyperplane instanceof Hyperplane);
  const index = hyperplane.coefficients.findIndex(c => {
    return !isCloseToZero(c, tolerance);
  });
  return hyperplane.coefficients.map((c, i) => {
    if (index === i) {
      return hyperplane.constant / c;
    }
    return 0;
  });
}

module.exports = basePoint;
