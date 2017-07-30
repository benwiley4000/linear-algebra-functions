const isCloseToZero = require('../util/isCloseToZero');

// true if the two given vectors are parallel
function vectorsAreParallel (vecA, vecB) {
  if (vecA.length !== vecB.length) {
    return false;
  }
  if (vecA.length === 1) {
    return true;
  }
  let ratio;
  for (let i = 0, len = vecA.length; i < len; i++) {
    const a = vecA[i];
    const b = vecB[i];
    if (isCloseToZero(a) && isCloseToZero(b)) {
      continue;
    }
    if (isCloseToZero(a)) {
      return vecA.every(c => isCloseToZero(c));
    }
    if (isCloseToZero(b)) {
      return vecB.every(c => isCloseToZero(c));
    }
    const r = a / b;
    if (typeof ratio === 'undefined') {
      ratio = r;
    }
    if (!isCloseToZero(r - ratio)) {
      return false;
    }
  }
  return true;
}

module.exports = vectorsAreParallel;
