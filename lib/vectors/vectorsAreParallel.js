const tolerance = require('../constants').tolerance;

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
    if (Math.abs(vecA[i] / vecB[i] - ratio) > tolerance) {
      return false;
    }
  }
  return true;
}

module.exports = vectorsAreParallel;
