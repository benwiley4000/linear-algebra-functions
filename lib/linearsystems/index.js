const LinearSystem = require('./LinearSystem');
const Parameterization = require('./Parameterization');
const swapRows = require('./swapRows');
const scalarMultiplyRow = require('./scalarMultiplyRow');
const addRowMultipleToAnother = require('./addRowMultipleToAnother');
const toTriangularForm = require('./toTriangularForm');
const toRref = require('./toRref');
const solveByGaussianElimination = require('./solveByGaussianElimination');
const solveRrefByGaussianElimination = require('./solveRrefByGaussianElimination');
const parameterizedSolution = require('./parameterizedSolution');
const systemIsInRref = require('./systemIsInRref');

const systemstore = require('./systemstore');

module.exports = {
  LinearSystem,
  Parameterization,
  swapRows,
  scalarMultiplyRow,
  addRowMultipleToAnother,
  toTriangularForm,
  toRref,
  solveByGaussianElimination,
  solveRrefByGaussianElimination,
  systemIsInRref,
  parameterizedSolution,
  systemstore
};
