const assert = require('assert');
const LinearSystem = require('./LinearSystem');
const LinearEquation = require('../linearequations').LinearEquation;
const add = require('../vectors').add;
const scalarMultiply = require('../vectors').scalarMultiply;

// given a linear system, a scalar, a source row index, and an index for a
// destination row index to which the scalar multiple of the source row
// should be added,
// returns a new linear system
function addRowMultipleToAnother (system, scalar, srcRowIndex, destRowIndex, tolerance) {
  assert(system instanceof LinearSystem);
  const equations = system.equations.slice();
  const srcRow = equations[srcRowIndex];
  const destRow = equations[destRowIndex];
  equations[destRowIndex] = new LinearEquation(
    add(
      srcRow.coefficients.length,
      destRow.coefficients,
      scalarMultiply(scalar, srcRow.coefficients)
    ),
    destRow.constant + scalar * srcRow.constant,
    tolerance
  );
  return new LinearSystem(equations);
}

module.exports = addRowMultipleToAnother;
