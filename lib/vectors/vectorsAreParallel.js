const isCloseToZero = require('../util/isCloseToZero');

// true if the two given vectors are parallel
function vectorsAreParallel (vecA, vecB) {
  if (vecA.length !== vecB.length) {
    return false;
  }
  if (vecA.length === 1) {
    return true;
  }
  const ratio = vecA[0] / vecB[0];
  for (let i = 1, len = vecA.length; i < len; i++) {
    if (!isCloseToZero(vecA[i] / vecB[i] - ratio)) {
      return false;
    }
  }
  return true;
}

module.exports = vectorsAreParallel;
