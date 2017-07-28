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

function thetaBetweenVectors (n, vecA, vecB, useDegrees) {
  const theta = Math.acos(
    dotProduct(n, vecA, vecB) /
    (magnitudeOfVector(vecA) * magnitudeOfVector(vecB))
  );
  return useDegrees ? theta * 180 / Math.PI : theta;
}

function vectorProjection (n, vec, basis) {
  basisUnit = unitVector(basis);
  return scalarMultiplyVector(dotProduct(n, vec, basisUnit), basisUnit);
}

function orthogonalComponent (n, vec, basis) {
  return subtractVectors(n, vec, vectorProjection(n, vec, basis));
}

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

function areaVectorParallelogram (vecA, vecB) {
  return magnitudeOfVector(crossProduct(vecA, vecB));
}

function areaVectorTriangle (vecA, vecB) {
  return areaVectorParallelogram(vecA, vecB) / 2;
}

const TOLERANCE = 0.001;

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
  vectorProjection,
  orthogonalComponent,
  crossProduct,
  areaVectorParallelogram,
  areaVectorTriangle,
  vectorsAreParallel,
  vectorsAreOrthogonal,
  TOLERANCE
};
