const SWAP_ROWS = '@@linalg/SWAP_ROWS';
const SCALAR_MULTIPLY_ROW = '@@linalg/SCALAR_MULTIPLY_ROW';
const ADD_ROW_MULTIPLE_TO_ANOTHER = '@@linalg/ADD_ROW_MULTIPLE_TO_ANOTHER';

function swapRows (rowIndexA, rowIndexB) {
  return {
    type: SWAP_ROWS,
    rowIndexA,
    rowIndexB
  };
}

function scalarMultiplyRow (scalar, rowIndex, tolerance) {
  return {
    type: SCALAR_MULTIPLY_ROW,
    scalar,
    rowIndex,
    tolerance
  };
}

function addRowMultipleToAnother (scalar, srcRowIndex, destRowIndex, tolerance) {
  return {
    type: ADD_ROW_MULTIPLE_TO_ANOTHER,
    scalar,
    srcRowIndex,
    destRowIndex,
    tolerance
  };
}

module.exports = {
  SWAP_ROWS,
  SCALAR_MULTIPLY_ROW,
  ADD_ROW_MULTIPLE_TO_ANOTHER,
  swapRows,
  scalarMultiplyRow,
  addRowMultipleToAnother
};
