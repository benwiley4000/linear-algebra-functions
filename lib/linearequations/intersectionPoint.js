const Line = require('./Line');
const linesAreParallel = require('./linesAreParallel');
const linesAreEqual = require('./linesAreEqual');
const assert = require('assert');

const parallelResponse = {
  intersectionType: 'none'
};

const equalResponse = {
  intersectionType: 'infinite'
};

function intersectionPoint (lineA, lineB) {
  assert(lineA instanceof Line && lineB instanceof Line);
  if (linesAreParallel(lineA, lineB)) {
    if (linesAreEqual(lineA, lineB)) {
      return equalResponse;
    }
    return parallelResponse;
  }
  const x = (
    (
      lineB.coefficients[1] * lineA.constant -
      lineA.coefficients[1] * lineB.constant
    ) /
    (
      lineA.coefficients[0] * lineB.coefficients[1] -
      lineA.coefficients[1] * lineB.coefficients[0]
    )
  );
  const y = (
    (
      -(lineB.coefficients[0] * lineA.constant) +
      lineA.coefficients[0] * lineB.constant
    ) /
    (
      lineA.coefficients[0] * lineB.coefficients[1] -
      lineA.coefficients[1] * lineB.coefficients[0]
    )
  );
  return {
    intersectionType: 'single',
    point: [x, y]
  };
}

module.exports = intersectionPoint;
