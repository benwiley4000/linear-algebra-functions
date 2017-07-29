// the product of a scalar constant and a vector
function scalarMultiply (s, vec) {
  const res = Array(vec.length);
  for (let i = 0, len = vec.length; i < len; i++) {
    res[i] = s * vec[i];
  }
  return res;
}

module.exports = scalarMultiply;
