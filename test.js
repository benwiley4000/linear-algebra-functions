/**
 * Initial test cases adapted from Udacity's
 * Linear Algebra Refresher Course:
 * https://www.udacity.com/course/linear-algebra-refresher-course--ud953
 **/

const test = require('tape');
const la = require('.');

function fix (num) {
  return num.toFixed(3);
}

test('Adds vectors', t => {
  t.test('[8.218 -9.341] + [-1.129 2.111] = [7.089 -7.230]', st => {
    st.plan(2);
    const res = la.addVectors(2, [8.218, -9.341], [-1.129, 2.111]);
    st.equal(fix(res[0]), fix(7.089));
    st.equal(fix(res[1]), fix(-7.230));
  });
});

test('Subtracts vectors', t => {
  t.test('[7.119 8.215] - [-8.223 0.878] = [15.342 7.337]', st => {
    st.plan(2);
    const res = la.subtractVectors(2, [7.119, 8.215], [-8.223, 0.878]);
    st.equal(fix(res[0]), fix(15.342));
    st.equal(fix(res[1]), fix(7.337));
  });
});

test('Multiplies vector by scalar', t => {
  t.test('7.41 [1.671 -1.012 -0.318] = [12.382 -7.499 -2.356]', st => {
    st.plan(3);
    const res = la.scalarMultiplyVector(7.41, [1.671, -1.012, -0.318]);
    st.equal(fix(res[0]), fix(12.382));
    st.equal(fix(res[1]), fix(-7.499));
    st.equal(fix(res[2]), fix(-2.356));
  });
});

test('Computes vector magnitude', t => {
  t.test('Magnitude of [-0.221 7.437] = 7.440', st => {
    st.plan(1);
    st.equal(fix(la.magnitudeOfVector([-0.221, 7.437])), fix(7.440));
  });

  t.test('Magnitude of [8.813 -1.331 -6.247] = 10.884', st => {
    st.plan(1);
    st.equal(fix(la.magnitudeOfVector([8.813, -1.331, -6.247])), fix(10.884));
  });
});

test('Computes the unit vector', t => {
  t.test('Unit vector of [5.581 -2.136] = [0.934 -0.357]', st => {
    st.plan(2);
    const res = la.unitVector([5.581, -2.136]);
    st.equal(fix(res[0]), fix(0.934));
    st.equal(fix(res[1]), fix(-0.357));
  });

  t.test('Unit vector of [1.996 3.108 -4.554] = [0.340 0.530 -0.777]', st => {
    st.plan(3);
    const res = la.unitVector([1.996, 3.108, -4.554]);
    st.equal(fix(res[0]), fix(0.340));
    st.equal(fix(res[1]), fix(0.530));
    st.equal(fix(res[2]), fix(-0.777));
  });
});

test('Computes dot product of two vectors', t => {
  t.test('[7.887 4.138] · [-8.802 6.776] = -41.382', st => {
    st.plan(1);
    const res = la.dotProduct(2, [7.887, 4.138], [-8.802, 6.776]);
    st.equal(fix(res), fix(-41.382));
  });

  t.test('[-5.955 -4.904 -1.874] · [-4.496 -8.755 7.103] = 56.397', st => {
    st.plan(1);
    const res = la.dotProduct(
      3,
      [-5.955, -4.904, -1.874],
      [-4.496, -8.755, 7.103]
    );
    st.equal(fix(res), fix(56.397));
  });
});

test('Computes angle between two vectors', t => {
  t.test('θ([3.183 -7.627], [-2.668 5.319]) = 3.072 radians', st => {
    st.plan(1);
    const res = la.thetaBetweenVectors(2, [3.183, -7.627], [-2.668, 5.319]);
    st.equal(fix(res), fix(3.072));
  });

  t.test('θ([7.35 0.221 5.188], [2.751 8.259 3.985]) = 60.276°', st => {
    st.plan(1);
    const res = la.thetaBetweenVectors(
      3,
      [7.35, 0.221, 5.188],
      [2.751, 8.259, 3.985],
      true
    );
    st.equal(fix(res), fix(60.276));
  });
});

test('Finds projection of vector against basis vector', t => {
  t.test('Projection of [3.039 1.879] onto [0.825 2.036] = [1.083, 2.672]', st => {
    st.plan(2);
    const res = la.vectorProjection(2, [3.039, 1.879], [0.825, 2.036]);
    st.equal(fix(res[0]), fix(1.083));
    st.equal(fix(res[1]), fix(2.672));
  });

  t.test('Projection of [3.009 -6.172 3.692 -2.51] onto [6.404 -9.144 2.759 8.718] = [1.969 -2.811 0.848 2.680]', st => {
    st.plan(4);
    const res = la.vectorProjection(4, [3.009, -6.172, 3.692, -2.51], [6.404, -9.144, 2.759, 8.718]);
    st.equal(fix(res[0]), fix(1.969));
    st.equal(fix(res[1]), fix(-2.811));
    st.equal(fix(res[2]), fix(0.848));
    st.equal(fix(res[3]), fix(2.680));
  });
});

test('Finds orthogonal component of vector against basis vector', t => {
  t.test('Orthogonal component of [-9.88 -3.264 -8.159] against [-2.155 -9.353 -9.473] = [-8.350 3.376 -1.434]', st => {
    st.plan(3);
    const res = la.orthogonalComponent(3, [-9.88, -3.264, -8.159], [-2.155, -9.353, -9.473]);
    st.equal(fix(res[0]), fix(-8.350));
    st.equal(fix(res[1]), fix(3.376));
    st.equal(fix(res[2]), fix(-1.434));
  });

  t.test('Orthogonal component of [3.009 -6.172 3.692 -2.51] against [6.404 -9.144 2.759 8.718] = [1.040 -3.361 2.844 -5.190]', st => {
    st.plan(4);
    const res = la.orthogonalComponent(4, [3.009, -6.172, 3.692, -2.51], [6.404, -9.144, 2.759, 8.718]);
    st.equal(fix(res[0]), fix(1.040));
    st.equal(fix(res[1]), fix(-3.361));
    st.equal(fix(res[2]), fix(2.844));
    st.equal(fix(res[3]), fix(-5.190));
  });
});

test('Finds cross product of two vectors', t => {
  t.test('[8.462 7.893 -8.187] × [6.984 -5.975 4.778] = [-11.205 -97.609 -105.685]', st => {
    st.plan(3);
    const res = la.crossProduct([8.462, 7.893, -8.187], [6.984, -5.975, 4.778]);
    st.equal(fix(res[0]), fix(-11.205));
    st.equal(fix(res[1]), fix(-97.609));
    st.equal(fix(res[2]), fix(-105.685));
  });
});

test('Finds area of parallelogram spanned by two vectors', t => {
  t.test('Area of parallelogram spanned by [8.462 7.893 -8.187], [6.984 -5.975 4.778] = 144.300', st => {
    st.plan(1);
    const res = la.areaVectorParallelogram([8.462, 7.893, -8.187], [6.984, -5.975, 4.778]);
    st.equal(fix(res), fix(144.300));
  });
});

test('Finds area of triangle spanned by two vectors', t => {
  t.test('Area of triangle spanned by [8.462 7.893 -8.187], [6.984 -5.975 4.778] = 72.150', st => {
    st.plan(1);
    const res = la.areaVectorTriangle([8.462, 7.893, -8.187], [6.984, -5.975, 4.778]);
    console.log(res);
    st.equal(fix(res), fix(72.150));
  });
});

test('Checks if two vectors are parallel', t => {
  t.test('[-7.579 -7.88], [22.737 23.64] ARE parallel', st => {
    st.plan(1);
    st.ok(la.vectorsAreParallel([-7.579, -7.88], [22.737, 23.64]));
  });

  t.test('[-2.029 9.97 4.172], [-9.231 -6.639 -7.245] ARE NOT parallel', st => {
    st.plan(1);
    st.notOk(la.vectorsAreParallel(
      [-2.029, 9.97, 4.172],
      [-9.231, -6.639, -7.245]
    ));
  });

  t.test('[-2.328 -7.284 -1.214], [-1.821 1.072 -2.94] ARE NOT parallel', st => {
    st.plan(1);
    st.notOk(la.vectorsAreParallel(
      [-2.328, -7.284, -1.214],
      [-1.821, 1.072, -2.94]
    ));
  });

  t.test('[2.118 4.827], [0 0] ARE parallel', st => {
    st.plan(1);
    st.ok(la.vectorsAreParallel([2.118, 4.827], [0, 0]));
  });
});

test('Checks if two vectors are orthogonal', t => {
  t.test('[-7.579 -7.88], [22.737 23.64] ARE NOT orthogonal', st => {
    st.plan(1);
    st.notOk(la.vectorsAreOrthogonal([-7.579, -7.88], [22.737, 23.64]));
  });

  t.test('[-2.029 9.97 4.172], [-9.231 -6.639 -7.245] ARE NOT orthogonal', st => {
    st.plan(1);
    st.notOk(la.vectorsAreOrthogonal(
      [-2.029, 9.97, 4.172],
      [-9.231, -6.639, -7.245]
    ));
  });

  t.test('[-2.328 -7.284 -1.214], [-1.821 1.072 -2.94] ARE orthogonal', st => {
    st.plan(1);
    st.ok(la.vectorsAreOrthogonal(
      [-2.328, -7.284, -1.214],
      [-1.821, 1.072, -2.94]
    ));
  });

  t.test('[2.118 4.827], [0 0] ARE orthogonal', st => {
    st.plan(1);
    st.ok(la.vectorsAreOrthogonal([2.118, 4.827], [0, 0]));
  });
});
