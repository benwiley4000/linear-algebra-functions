const areaOfParallelogram = require('./areaOfParallelogram');

// area of the triangle spanned by two adjacent vectors
function areaOfTriangle (vecA, vecB) {
  return areaOfParallelogram(vecA, vecB) / 2;
}

module.exports = areaOfTriangle;
