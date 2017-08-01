const Hyperplane = require('./Hyperplane');
const Line = require('./Line');
const basePoint = require('./basePoint');
const intersectionPoint = require('./intersectionPoint');
const hyperplanesAreParallel = require('./hyperplanesAreParallel');
const hyperplanesAreEqual = require('./hyperplanesAreEqual');
const linesAreParallel = require('./linesAreParallel');
const linesAreEqual = require('./linesAreEqual');

module.exports = {
  Hyperplane,
  Line,
  basePoint,
  intersectionPoint,
  hyperplanesAreParallel,
  hyperplanesAreEqual,
  linesAreParallel,
  linesAreEqual
};
