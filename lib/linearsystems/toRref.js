const assert = require('assert');
const LinearSystem = require('./LinearSystem');
const toTriangularForm = require('./toTriangularForm');
const systemstore = require('./systemstore');
const isCloseToZero = require('../util/isCloseToZero');

function eqs (system) {
  return system.equations;
}

function currCoeffs (system, i) {
  return system.equations[i].coefficients;
}

// given linear system, returns linear system in reduced row echelon form (RREF)
function toRref (system, tolerance) {
  assert(system instanceof LinearSystem);
  const triangularForm = toTriangularForm(system, tolerance);
  const actions = triangularForm.actions;
  let s = triangularForm.system;
  for (let i = eqs(s).length - 1; i >= 0; i--) {
    // find leading nonzero coefficient variable index
    const j = currCoeffs(s, i).findIndex(c => {
      return !isCloseToZero(c, tolerance);
    });
    if (j === -1) {
      // skip this row if there isn't a nonzero coefficient
      continue;
    }
    if (currCoeffs(s, i)[j] !== 1) {
      // if our coefficient isn't 1, multiply the row to fix that
      const action = systemstore.actions.scalarMultiplyRow(
        1 / currCoeffs(s, i)[j],
        i,
        tolerance
      );
      s = systemstore.reducer(s, action);
      actions.push(action);
    }
    // clear the corresponding coefficients in all rows above
    for (let k = i - 1; k >= 0; k--) {
      if (isCloseToZero(currCoeffs(s, k)[j], tolerance)) {
        continue;
      }
      const action = systemstore.actions.addRowMultipleToAnother(
        -1 * currCoeffs(s, k)[j] / currCoeffs(s, i)[j],
        i,
        k,
        tolerance
      );
      s = systemstore.reducer(s, action);
      actions.push(action);
    }
  }
  return {
    system: s,
    actions
  };
}

module.exports = toRref;
