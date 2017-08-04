const assert = require('assert');
const LinearSystem = require('./LinearSystem');
const systemstore = require('./systemstore');

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
      if (currCoeffs(s, i)[j] === 0) {
        let laterNonZeroCoefficientExists = false;
        let k;
        for (k = i + 1; k < eqs(s).length; k++) {
          if (currCoeffs(s, k)[j] !== 0) {
            laterNonZeroCoefficientExists = true;
            break;
          }
        }
        if (!laterNonZeroCoefficientExists) {
          j++;
          continue;
        }
        const action = systemstore.actions.swapRows(i, k);
        s = systemstore.reducer(s, action);
        actions.push(action);
      }
      for (let k = i + 1; k < eqs(s).length; k++) {
        if (currCoeffs(s, k)[j] === 0) {
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
