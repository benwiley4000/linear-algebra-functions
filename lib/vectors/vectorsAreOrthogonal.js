const dotProduct = require('./dotProduct');
const isCloseToZero = require('../util/isCloseToZero');

// true if the two given vectors are orthogonal
function vectorsAreOrthogonal (vecA, vecB) {
  if (vecA.length !== vecB.length) {
    return false;
  }
  return isCloseToZero(dotProduct(vecA.length, vecA, vecB));
}

module.exports = vectorsAreOrthogonal;
