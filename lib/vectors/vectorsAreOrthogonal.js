const dotProduct = require('./dotProduct');
const tolerance = require('../constants').tolerance;

// true if the two given vectors are orthogonal
function vectorsAreOrthogonal (vecA, vecB) {
  if (vecA.length !== vecB.length) {
    return false;
  }
  return Math.abs(dotProduct(vecA.length, vecA, vecB)) <= tolerance;
}

module.exports = vectorsAreOrthogonal;
