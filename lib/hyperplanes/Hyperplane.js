const isCloseToZero = require('../util/isCloseToZero');

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
}

Hyperplane.displayName = 'Hyperplane';

module.exports = Hyperplane;
