const dotProduct = require('./dotProduct');
const magnitude = require('./magnitude');

// angle between two vectors of size n, in radians (default) or degrees
function theta (n, vecA, vecB, useDegrees = false) {
  const theta = Math.acos(
    dotProduct(n, vecA, vecB) /
    (magnitude(vecA) * magnitude(vecB))
  );
  return useDegrees ? theta * 180 / Math.PI : theta;
}

module.exports = theta;
