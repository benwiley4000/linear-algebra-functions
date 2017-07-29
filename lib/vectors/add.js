// sum of two vectors of size n
function add (n, vecA, vecB) {
  const res = Array(n);
  for (let i = 0; i < n; i++) {
    res[i] = vecA[i] + vecB[i];
  }
  return res;
}

module.exports = add;
