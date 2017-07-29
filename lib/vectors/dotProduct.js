// dot product of two vectors of size n
function dotProduct (n, vecA, vecB) {
  let res = 0;
  for (let i = 0; i < n; i++) {
    res += vecA[i] * vecB[i];
  }
  return res;
}

module.exports = dotProduct;
