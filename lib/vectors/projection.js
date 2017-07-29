const unit = require('./unit');
const scalarMultiply = require('./scalarMultiply');
const dotProduct = require('./dotProduct');

// the projection vector of one given vector of
// size n on a second basis vector of size n
function projection (n, vec, basis) {
  basisUnit = unit(basis);
  return scalarMultiply(dotProduct(n, vec, basisUnit), basisUnit);
}

module.exports = projection;
