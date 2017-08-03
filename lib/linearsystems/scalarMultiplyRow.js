const assert = require('assert');
const LinearSystem = require('./LinearSystem');
const Hyperplane = require('../hyperplanes').Hyperplane;
const scalarMultiply = require('../vectors').scalarMultiply;

// given a linear system, a scalar, and the index of a row to multiply,
// returns a new linear system
function scalarMultiplyRow (system, scalar, rowIndex, tolerance) {
  assert(system instanceof LinearSystem);
  const equations = system.equations.slice();
  const row = equations[rowIndex];
  equations[rowIndex] = new Hyperplane(
    scalarMultiply(scalar, row.coefficients),
    scalar * row.constant,
    tolerance
  );
  return new LinearSystem(equations);
}

module.exports = scalarMultiplyRow;
