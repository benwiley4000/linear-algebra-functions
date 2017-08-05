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
function dimensionIndexToSymbol (index) {
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

// for printing; avoids printing '-0'
function nonNegativeZero (value) {
  return value === 0 ? 0 : value;
}

/**
 * Hyperplane of form c1*x + c2*y + c2*z + ... = k
 * where c1 ... cn and k are all constants.
 */
class Hyperplane {
  // coefficients: array of [c1 ... cn] constants
  // constant: k value
  // tolerance: optional +/- tolerance for checking if a value is close to zero
  constructor (coefficients, constant, tolerance) {
    this.coefficients = coefficients;
    this.constant = constant;
  }

  toString () {
    const variableExpression = this.coefficients.length > 3
      ? this.coefficients
        .map((c, i) => `${nonNegativeZero(c)}x${numberToSubscript(i + 1)}`)
        .join(' + ')
      : this.coefficients
        .map((c, i) => `${nonNegativeZero(c)}${dimensionIndexToSymbol(i)}`)
        .join(' + ');
    return `${variableExpression} = ${nonNegativeZero(this.constant)}`;
  }
}

Hyperplane.displayName = 'Hyperplane';

module.exports = Hyperplane;
