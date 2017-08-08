const assert = require('assert');
const isCloseToZero = require('../util/isCloseToZero');

const numberSubscriptOffset = 8272;

function numberToSubscript (num) {
  return Array.prototype.reduce.call(num.toString(), (acc, digit) => {
    return acc + (
      isNaN(digit)
        ? digit
        : String.fromCharCode(digit.charCodeAt(0) + numberSubscriptOffset)
    );
  }, '');
}

// for 3 or fewer dimensions
function dimensionIndexToVariable (index) {
  switch (index) {
    case 0:
      return 'x';
    case 1:
      return 'y';
    case 2:
      return 'z';
    default:
      throw new Error(`Index should be 0, 1, or 2 - not ${index}.`);
  }
}

// for 2 or fewer parameters
function parameterIndexToVariable (index) {
  switch (index) {
    case 0:
      return 't';
    case 1:
      return 's';
    default:
      throw new Error(`Index should be 0 or 1 - not ${index}.`)
  }
}

class Parameterization {
  constructor (basePoint, directionVectors) {
    assert(basePoint.length > 0);
    const len = basePoint.length;
    if (directionVectors.some(vec => vec.length !== len)) {
      throw new Error(
        'Direction vectors must not be in different dimensions than base point'
      );
    }
    this.basePoint = basePoint;
    this.directionVectors = directionVectors;
  }

  toString () {
    return this.directionVectors
      .reduce((acc, curr, index) => {
        const paramName = this.directionVectors.length > 2
            ? `t${numberToSubscript(index)}`
            : parameterIndexToVariable(index);
        return acc.map((c, i) => {
          return acc[i] + (curr[i] ? ` + ${curr[i]}${paramName}` : '');
        });
      }, this.basePoint)
      .map((parameterSummation, index) => {
        const varName = this.basePoint.length > 3
          ? `x${numberToSubscript(index)}`
          : dimensionIndexToVariable(index);
        return `${varName} = ${parameterSummation}`;
      })
      .join('\n');
  }
}

module.exports = Parameterization;
