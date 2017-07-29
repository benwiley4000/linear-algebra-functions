// cross product of two vectors of size 2 or 3
function crossProduct (vecA, vecB) {
  const x1 = vecA[0];
  const y1 = vecA[1];
  const z1 = vecA[2] || 0;
  const x2 = vecB[0];
  const y2 = vecB[1];
  const z2 = vecB[2] || 0;
  return [
    y1 * z2 - y2 * z1,
    -(x1 * z2 - x2 * z1),
    x1 * y2 - x2 * y1
  ];
}

module.exports = crossProduct;
