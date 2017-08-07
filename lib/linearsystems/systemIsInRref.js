const assert = require('assert');
const LinearSystem = require('./LinearSystem');
const isCloseToZero = require('../util/isCloseToZero');

function systemIsInRref (system, tolerance) {
  assert(system instanceof LinearSystem);

  const eqs = system.equations;

  // check nonzero rows to ensure each pivot is at index greater than previous
  let lastPivotColumnIndex = -1;
  let row = 0;
  while (row < eqs.length) {
    const coeffs = eqs[row].coefficients;
    const pivotColumnIndex = coeffs.findIndex(c => !isCloseToZero(c, tolerance));
    if (pivotColumnIndex === -1) {
      row++;
      break;
    }
    if (
      pivotColumnIndex < lastPivotColumnIndex ||
      !isCloseToZero(coeffs[pivotColumnIndex] - 1, tolerance)
    ) {
      return false;
    }
    for (let r = row - 1; r >= 0; r--) {
      if (!isCloseToZero(eqs[r].coefficients[pivotColumnIndex], tolerance)) {
        return false;
      }
    }
    lastPivotColumnIndex = pivotColumnIndex;
    row++;
  }

  // check remaining rows to ensure no non-zero coefficients
  while (row < eqs.length) {
    if (eqs[row].coefficients.some(c => !isCloseToZero(c, tolerance))) {
      return false;
    }
    row++;
  }

  return true;
}

module.exports = systemIsInRref;
