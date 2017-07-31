const Hyperplane = require('./Hyperplane');

/**
 * Line of form a*x + b*y + k = 0
 * where a, b and k are constants.
 */
class Line extends Hyperplane {
  // xCoefficient: a value
  // yCoefficient: b value
  // constant: k value
  // tolerance: optional +/- tolerance for checking if a value is close to zero
  constructor (xCoefficient, yCoefficient, constant, tolerance) {
    super([xCoefficient, yCoefficient], constant, tolerance);
  }
}

Line.displayName = 'Line';

module.exports = Line;
