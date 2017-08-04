const assert = require('assert');
const LinearSystem = require('./LinearSystem');
const systemstore = require('./systemstore');
const isCloseToZero = require('../util/isCloseToZero');

function eqs (system) {
  return system.equations;
}

function currCoeffs (system, i) {
  return system.equations[i].coefficients;
}

// given a linear system, returns a linear system in triangular form
function toTriangularForm (system, tolerance) {
  assert(system instanceof LinearSystem);
  const actions = [];
  let s = system;
  let j = 0;
  for (let i = 0, len = eqs(s).length; i < len; i++) {
    while (j < currCoeffs(s, i).length) {
      if (isCloseToZero(currCoeffs(s, i)[j], tolerance)) {
        // if our coefficient is 0...
        let laterNonZeroCoefficientExists = false;
        let k;
        // find out if there are any later nonzero coefficients for same var
        for (k = i + 1; k < eqs(s).length; k++) {
          if (currCoeffs(s, k)[j] !== 0) {
            laterNonZeroCoefficientExists = true;
            break;
          }
        }
        if (!laterNonZeroCoefficientExists) {
          // if not, we can move to the next variable column
          j++;
          continue;
        }
        // if such a nonzero coefficient exists, we swap that row with ours
        const action = systemstore.actions.swapRows(i, k);
        s = systemstore.reducer(s, action);
        actions.push(action);
      }
      // now that we have a nonzero coefficient for our variable we need to
      // clear the corresponding coefficients in all later rows
      for (let k = i + 1; k < eqs(s).length; k++) {
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
      j++;
      break;
    }
  }
  return {
    system: s,
    actions
  };
}

module.exports = toTriangularForm;
