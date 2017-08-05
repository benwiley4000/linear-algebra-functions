const LinearSystem = require('./LinearSystem');
const swapRows = require('./swapRows');
const scalarMultiplyRow = require('./scalarMultiplyRow');
const addRowMultipleToAnother = require('./addRowMultipleToAnother');
const toTriangularForm = require('./toTriangularForm');
const toRref = require('./toRref');
const solveByGaussianElimination = require('./solveByGaussianElimination');

const systemstore = require('./systemstore');

module.exports = {
  LinearSystem,
  swapRows,
  scalarMultiplyRow,
  addRowMultipleToAnother,
  toTriangularForm,
  toRref,
  solveByGaussianElimination,
  systemstore
};
