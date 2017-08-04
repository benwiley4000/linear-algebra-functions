const LinearSystem = require('./LinearSystem');
const swapRows = require('./swapRows');
const scalarMultiplyRow = require('./scalarMultiplyRow');
const addRowMultipleToAnother = require('./addRowMultipleToAnother');

const systemstore = require('./systemstore');

module.exports = {
  LinearSystem,
  swapRows,
  scalarMultiplyRow,
  addRowMultipleToAnother,
  systemstore
};
