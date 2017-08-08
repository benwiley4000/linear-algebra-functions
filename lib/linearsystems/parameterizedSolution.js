const assert = require('assert');
const LinearSystem = require('./LinearSystem');
const Parameterization = require('./Parameterization');
const systemIsInRref = require('./systemIsInRref');
const isCloseToZero = require('../util/isCloseToZero');

function parameterizedSolution (system, tolerance) {
  assert(system instanceof LinearSystem);
  if (!systemIsInRref(system, tolerance)) {
    throw new Error('System must be in reduced row echelon form');
  }

  const eqs = system.equations;
  const numVars = eqs[0].coefficients.length;
  const basePoint = Array(numVars);
  const directionVectors = [];

  // pivotRowIndices is a mapping of variable index
  // to row where its pivot exists. will be assigned
  // -1 if the corresponding variable is a free variable.
  const pivotRowIndices = Array(numVars);
  let row = -1;
  for (let col = 0; col < numVars; col++) {
    let r = eqs.length - 1;
    while (r >= 0) {
      if (!isCloseToZero(eqs[r].coefficients[col], tolerance)) {
        break;
      }
      r--;
    }
    if (r > row) {
      // new pivot
      pivotRowIndices[col] = r;
      row = r;
      basePoint[col] = eqs[row].constant;
    } else {
      // free variable
      pivotRowIndices[col] = -1;
      basePoint[col] = 0;
      const directionVector = Array(numVars);
      for (let i = 0; i < numVars; i++) {
        if (i === col) {
          // this index in the vector corresponds to our free variable
          directionVector[i] = 1;
        } else if (i > row) {
          directionVector[i] = 0;
        } else if (pivotRowIndices[i] >= 0) {
          // this index in the vector corresponds to a pivot variable
          directionVector[i] = -1 * eqs[pivotRowIndices[i]].coefficients[col];
        } else {
          directionVector[i] = 0;
        }
      }
      directionVectors.push(directionVector);
    }
  }

  return new Parameterization(basePoint, directionVectors);
}

module.exports = parameterizedSolution;
