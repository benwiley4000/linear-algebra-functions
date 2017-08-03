const assert = require('assert');
const LinearSystem = require('./LinearSystem');

// given a linear system, and indices of two rows to swap,
// returns a new linear system
function swapRows (system, rowIndexA, rowIndexB) {
  assert(system instanceof LinearSystem);
  const equations = system.equations.slice();
  const rowA = equations[rowIndexA];
  equations[rowIndexA] = equations[rowIndexB];
  equations[rowIndexB] = rowA;
  return new LinearSystem(equations);
}

module.exports = swapRows;
