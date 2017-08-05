const assert = require('assert');
const LinearSystem = require('./LinearSystem');
const toRref = require('./toRref');
const isCloseToZero = require('../util/isCloseToZero');

// given linear system,
// returns:
//   solution type: 'single' | 'infinite' | 'none'
//   solution to linear system
//   linear system in reduced row echelon form (RREF)
//   set of actions to reproduce linear system
function solveByGaussianElimination (system, tolerance) {
  assert(system instanceof LinearSystem);
  const { system: s, actions } = toRref(system, tolerance);

  const indexOfContradictoryEquation = s.equations.findIndex(eq => {
    return (
      eq.coefficients.every(c => isCloseToZero(c, tolerance)) &&
      !isCloseToZero(eq.constant, tolerance)
    );
  });
  if (indexOfContradictoryEquation !== -1) {
    return {
      solutionType: 'none',
      system: s,
      actions
    };
  }

  const numVariables = s.equations[0].coefficients.length;
  const numPivots = s.equations.filter(eq => {
    return eq.coefficients.some(c => !isCloseToZero(c, tolerance));
  }).length;
  if (numPivots !== numVariables) {
    return {
      solutionType: 'infinite',
      system: s,
      actions
    };
  }

  return {
    solutionType: 'single',
    solution: s.equations.slice(0, numVariables).map(eq => eq.constant),
    system: s,
    actions
  };
}

module.exports = solveByGaussianElimination;
