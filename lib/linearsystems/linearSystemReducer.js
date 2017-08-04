const swapRows = require('./swapRows');
const scalarMultiplyRow = require('./scalarMultiplyRow');
const addRowMultipleToAnother = require('./addRowMultipleToAnother');

function linearSystemReducer (system, action) {
  switch (action.type) {
    case 'SWAP_ROWS':
      return swapRows(system, action.rowIndexA, action.rowIndexB);
    case 'SCALAR_MULTIPLY_ROW':
      return scalarMultiplyRow(
        system,
        action.scalar,
        action.rowIndex,
        action.tolerance
      );
    case 'ADD_ROW_MULTIPLE_TO_ANOTHER':
      return addRowMultipleToAnother(
        system,
        action.scalar,
        action.srcRowIndex,
        action.destRowIndex,
        action.tolerance
      );
    default:
      return system;
  }
}

module.exports = linearSystemReducer;
