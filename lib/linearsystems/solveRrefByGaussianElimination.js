const assert = require('assert');
const LinearSystem = require('./LinearSystem');
const systemIsInRref = require('./systemIsInRref');
const isCloseToZero = require('../util/isCloseToZero');

// given linear system in reduced row echelon form,
// returns:
//   solution type: 'single' | 'infinite' | 'none'
//   solution to linear system
function solveRrefByGaussianElimination (system, tolerance) {
  assert(system instanceof LinearSystem);
  if (!systemIsInRref(system, tolerance)) {
    throw new Error('System must be in reduced row echelon form');
  }

  const eqs = system.equations;

  const indexOfContradictoryEquation = eqs.findIndex(eq => {
    return (
      eq.coefficients.every(c => isCloseToZero(c, tolerance)) &&
      !isCloseToZero(eq.constant, tolerance)
    );
  });
  if (indexOfContradictoryEquation !== -1) {
    return {
      solutionType: 'none'
    };
  }

  const numVariables = eqs[0].coefficients.length;
  const numPivots = eqs.filter(eq => {
    return eq.coefficients.some(c => !isCloseToZero(c, tolerance));
  }).length;
  if (numPivots !== numVariables) {
    return {
      solutionType: 'infinite'
    };
  }

  return {
    solutionType: 'single',
    solution: eqs.slice(0, numVariables).map(eq => eq.constant)
  };
}

module.exports = solveRrefByGaussianElimination;
