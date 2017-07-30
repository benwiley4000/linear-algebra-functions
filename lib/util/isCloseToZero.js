const t = require('../constants').tolerance;

// true if absolute value of num is less than or equal to tolerance value
function isCloseToZero (num, tolerance = t) {
  return Math.abs(num) <= tolerance;
}

module.exports = isCloseToZero;
