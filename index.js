function addVectors (n, vecA, vecB) {
  const res = Array(n);
  for (let i = 0; i < n; i++) {
    res[i] = vecA[i] + vecB[i];
  }
  return res;
}

function subtractVectors (n, vecA, vecB) {
  const res = Array(n);
  for (let i = 0; i < n; i++) {
    res[i] = vecA[i] - vecB[i];
  }
  return res;
}

function scalarMultiplyVector (s, vec) {
  const res = Array(vec.length);
  for (let i = 0, len = vec.length; i < len; i++) {
    res[i] = s * vec[i];
  }
  return res;
}

function magnitudeOfVector (vec) {
  return Math.sqrt(vec.reduce((acc, v) => acc + v * v, 0));
}

function unitVector (vec) {
  return scalarMultiplyVector(1 / magnitudeOfVector(vec), vec);
}

module.exports = {
  addVectors,
  subtractVectors,
  scalarMultiplyVector,
  magnitudeOfVector,
  unitVector,
};

