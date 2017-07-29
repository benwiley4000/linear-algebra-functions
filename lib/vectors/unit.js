const scalarMultiply = require('./scalarMultiply');
const magnitude = require('./magnitude');

// the unit vector corresponding to a given vector
function unit (vec) {
  return scalarMultiply(1 / magnitude(vec), vec);
}

module.exports = unit;
