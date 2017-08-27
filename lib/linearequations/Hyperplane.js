const LinearEquation = require('./LinearEquation');
const isCloseToZero = require('../util/isCloseToZero');

/**
 * Hyperplane of form c1*x + c2*y + c2*z + ... = k
 * where c1 ... cn and k are all constants.
 */
class Hyperplane extends LinearEquation {
  // coefficients: array of [c1 ... cn] constants
  // constant: k value
  // tolerance: optional +/- tolerance for checking if a value is close to zero
  constructor (coefficients, constant, tolerance) {
    super(coefficients, constant, tolerance);
    if (coefficients.some(c => typeof c !== 'number')) {
      throw new Error(
        'Cannot create hyperplane with non-numeric coefficients'
      );
    }
    if (coefficients.every(c => isCloseToZero(c, tolerance))) {
      throw new Error(
        `${this.constructor.displayName}'s normal vector cannot be zero vector`
      );
    }
  }
}

Hyperplane.displayName = 'Hyperplane';

module.exports = Hyperplane;
