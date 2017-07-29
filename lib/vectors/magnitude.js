// the magnitude of a vector
function magnitude (vec) {
  return Math.sqrt(vec.reduce((acc, v) => acc + v * v, 0));
}

module.exports = magnitude;
