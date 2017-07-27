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

function dotProduct (n, vecA, vecB) {
  let res = 0;
  for (let i = 0; i < n; i++) {
    res += vecA[i] * vecB[i];
  }
  return res;
}

function thetaBetweenVectors (n, vecA, vecB) {
  return Math.acos(
    dotProduct(n, vecA, vecB) /
    (magnitudeOfVector(vecA) * magnitudeOfVector(vecB))
  );
}

const TOLERANCE = 0.005;

function vectorsAreParallel (vecA, vecB) {
  if (vecA.length !== vecB.length) {
    return false;
  }
  if (vecA.length === 1) {
    return true;
  }
  const ratio = vecA[0] / vecB[0];
  for (let i = 1, len = vecA.length; i < len; i++) {
    if (Math.abs(vecA[i] / vecB[i] - ratio) > TOLERANCE) {
      return false;
    }
  }
  return true;
}

function vectorsAreOrthogonal (vecA, vecB) {
  if (vecA.length !== vecB.length) {
    return false;
  }
  return Math.abs(dotProduct(vecA.length, vecA, vecB)) <= TOLERANCE;
}

module.exports = {
  addVectors,
  subtractVectors,
  scalarMultiplyVector,
  magnitudeOfVector,
  unitVector,
  dotProduct,
  thetaBetweenVectors,
  vectorsAreParallel,
  vectorsAreOrthogonal,
};
