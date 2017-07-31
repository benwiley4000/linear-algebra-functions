const isCloseToZero = require('../util/isCloseToZero');

const numberSubscriptOffset = 8272;

function numberToSubscript (num) {
  return Array.prototype.map.call(num.toString(), digit => {
    if (isNaN(digit)) {
      return digit;
    }
    return String.fromCharCode(digit.charCodeAt(0) + numberSubscriptOffset);
  });
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

/**
 * Hyperplane of form c1*x + c2*y + c2*z + ... + k = 0
 * where c1 ... cn and k are all constants.
 */
class Hyperplane {
  // coefficients: array of [c1 ... cn] constants
  // constant: k value
  // tolerance: optional +/- tolerance for checking if a value is close to zero
  constructor (coefficients, constant, tolerance) {
    if (coefficients.every(c => isCloseToZero(c, tolerance))) {
      throw new Error(
        `${this.constructor.displayName}'s normal vector cannot be zero vector`
      );
    }
    this.coefficients = coefficients;
    this.constant = constant;
  }

  toString () {
    const variableExpression = this.coefficients.length > 3
      ? this.coefficients
        .map((c, i) => `${c}x${numberToSubscript(i + 1)}`)
        .join(' + ')
      : this.coefficients
        .map((c, i) => `${c}${dimensionIndexToSymbol(i)}`)
        .join(' + ');
    return `${variableExpression} = ${-1 * this.constant}`;
  }
}

Hyperplane.displayName = 'Hyperplane';

module.exports = Hyperplane;
