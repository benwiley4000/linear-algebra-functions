const assert = require('assert');
const LinearSystem = require('./LinearSystem');
const toRref = require('./toRref');
const solveRref = require('./solveRrefByGaussianElimination');

// given linear system,
// returns:
//   solution type: 'single' | 'infinite' | 'none'
//   solution to linear system
//   linear system in reduced row echelon form (RREF)
//   set of actions to reproduce linear system
function solveByGaussianElimination (system, tolerance) {
  assert(system instanceof LinearSystem);
  const { system: s, actions } = toRref(system, tolerance);
  const { solutionType, solution } = solveRref(s, tolerance);
  return {
    solutionType,
    solution,
    system: s,
    actions
  };
}

module.exports = solveByGaussianElimination;
