const magnitude = require('./magnitude');
const crossProduct = require('./crossProduct');

// area of the parallelogram spanned by two adjacent vectors
function areaOfParallelogram (vecA, vecB) {
  return magnitude(crossProduct(vecA, vecB));
}

module.exports = areaOfParallelogram;
