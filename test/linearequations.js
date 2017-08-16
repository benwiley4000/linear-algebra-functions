/**
 * Initial test cases adapted from Udacity's
 * Linear Algebra Refresher Course:
 * https://www.udacity.com/course/linear-algebra-refresher-course--ud953
 **/

const test = require('tape');
const le = require('../lib/linearequations');
const isCloseToZero = require('../lib/util/isCloseToZero');
const fix = require('./testhelpers/fix');

function random (min = -100, max = 100) {
  return Math.random() * (max - min) - min;
}

function randomNonZero (min, max) {
  const r = random(min, max);
  return isCloseToZero(r) ? randomNonZero(min, max) : r;
}

const hyperplaneErrorRegex = /'s normal vector cannot be zero vector/;

test('Can define hyperplane using arbitrary coefficients and constant', t => {
  t.plan(15);
  for (let i = 0; i < 5; i++) {
    const coefficients = [];
    for (let j = 0, len = Math.ceil(randomNonZero(0, 10)); j < len; j++) {
      coefficients[j] = random();
    }
    if (coefficients.every(c => isCloseToZero(c))) {
      coefficients[Math.floor(random(0, coefficients.length))] = randomNonZero();
    }
    const constant = random();
    let hyperplane;
    t.doesNotThrow(() => {
      hyperplane = new le.Hyperplane(coefficients, constant);
    }, hyperplaneErrorRegex);
    t.deepEqual(hyperplane.coefficients, coefficients);
    t.equal(hyperplane.constant, constant);
  }
});

test('Can define line using arbitrary coefficients and constant', t => {
  t.plan(15);
  for (let i = 0; i < 5; i++) {
    let xCoefficient = random();
    let yCoefficient = random();
    if (isCloseToZero(xCoefficient) && isCloseToZero(yCoefficient)) {
      if (Math.random() < 0.5) {
        xCoefficient = randomNonZero();
      } else {
        yCoefficient = randomNonZero();
      }
    }
    const constant = random();
    let line;
    t.doesNotThrow(() => {
      line = new le.Line(xCoefficient, yCoefficient, constant);
    }, hyperplaneErrorRegex);
    t.deepEqual(line.coefficients, [xCoefficient, yCoefficient]);
    t.equal(line.constant, constant);
  }
});

test('Hyperplane cannot be defined with all-zero coefficients', t => {
  t.plan(1);
  const coefficients = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const constant = random();
  t.throws(() => {
    const hyperplane = new le.Hyperplane(coefficients, constant);
  }, hyperplaneErrorRegex);
}, {
  skip: true
});

test('Line cannot be defined with all-zero coefficients', t => {
  t.plan(1);
  const constant = random();
  t.throws(() => {
    const line = new le.Line(0, 0, constant);
  }, hyperplaneErrorRegex);
}, {
  skip: true
});

test('Tests intersections of two lines', t => {
  const lineSetA = [
    new le.Line(4.046, 2.836, 1.21),
    new le.Line(10.115, 7.09, 3.025)
  ];
  const lineSetB = [
    new le.Line(7.204, 3.182, 8.68),
    new le.Line(8.172, 4.114, 9.883)
  ];
  const lineSetC = [
    new le.Line(1.182, 5.562, 6.744),
    new le.Line(1.773, 8.343, 9.525)
  ];

  t.test('Determines if two lines are parallel', st => {
    st.test(`${lineSetA[0]} and ${lineSetA[1]} ARE parallel`, sst => {
      sst.plan(1);
      sst.ok(le.linesAreParallel(...lineSetA));
    });

    st.test(`${lineSetB[0]} and ${lineSetB[1]} ARE NOT parallel`, sst => {
      sst.plan(1);
      sst.notOk(le.linesAreParallel(...lineSetB));
    });

    st.test(`${lineSetC[0]} and ${lineSetC[1]} ARE parallel`, sst => {
      sst.plan(1);
      sst.ok(le.linesAreParallel(...lineSetC));
    });
  });

  t.test('Determines if two lines are equal', st => {
    st.test(`${lineSetA[0]} and ${lineSetA[1]} ARE equal`, sst => {
      sst.plan(1);
      sst.ok(le.linesAreEqual(...lineSetA));
    });

    st.test(`${lineSetB[0]} and ${lineSetB[1]} ARE NOT equal`, sst => {
      sst.plan(1);
      sst.notOk(le.linesAreEqual(...lineSetB));
    });

    st.test(`${lineSetC[0]} and ${lineSetC[1]} ARE NOT equal`, sst => {
      sst.plan(1);
      sst.notOk(le.linesAreEqual(...lineSetC));
    });
  });

  t.test('Finds the intersection point of two lines', st => {
    st.test(`${lineSetA[0]} and ${lineSetA[1]} intersect infinitely many times`, sst => {
      sst.plan(1);
      sst.equal(le.intersectionPoint(...lineSetA).intersectionType, 'infinite');
    });

    st.test(`${lineSetB[0]} and ${lineSetB[1]} intersect at `, sst => {
      sst.plan(3);
      const ip = le.intersectionPoint(...lineSetB);
      sst.equal(ip.intersectionType, 'single');
      sst.equal(fix(ip.point[0]), fix(1.173));
      sst.equal(fix(ip.point[1]), fix(0.073));
    });

    st.test(`${lineSetC[0]} and ${lineSetC[1]} do not intersect`, sst => {
      sst.plan(1);
      sst.equal(le.intersectionPoint(...lineSetC).intersectionType, 'none');
    });
  });
});

test('Tests intersections of two planes', t => {
  const planeSetA = [
    new le.Hyperplane([-0.412, 3.806, 0.728], -3.46),
    new le.Hyperplane([1.03, -9.515, -1.82], 8.65)
  ];
  const planeSetB = [
    new le.Hyperplane([2.611, 5.528, 0.283], 4.6),
    new le.Hyperplane([7.715, 8.306, 5.342], 3.76)
  ];
  const planeSetC = [
    new le.Hyperplane([-7.926, 8.625, -7.212], -7.952),
    new le.Hyperplane([-2.642, 2.875, -2.404], -2.443)
  ];

  t.test('Determines if two planes are parallel', st => {
    st.test(`${planeSetA[0]} and ${planeSetA[1]} ARE parallel`, sst => {
      sst.plan(1);
      sst.ok(le.hyperplanesAreParallel(...planeSetA));
    });

    st.test(`${planeSetB[0]} and ${planeSetB[1]} ARE NOT parallel`, sst => {
      sst.plan(1);
      sst.notOk(le.hyperplanesAreParallel(...planeSetB));
    });

    st.test(`${planeSetC[0]} and ${planeSetC[1]} ARE parallel`, sst => {
      sst.plan(1);
      sst.ok(le.hyperplanesAreParallel(...planeSetC));
    });
  });

  t.test('Determines if two planes are equal', st => {
    st.test(`${planeSetA[0]} and ${planeSetA[1]} ARE equal`, sst => {
      sst.plan(1);
      sst.ok(le.hyperplanesAreEqual(...planeSetA));
    });

    st.test(`${planeSetB[0]} and ${planeSetB[1]} ARE NOT equal`, sst => {
      sst.plan(1);
      sst.notOk(le.hyperplanesAreEqual(...planeSetB));
    });

    st.test(`${planeSetC[0]} and ${planeSetC[1]} ARE NOT equal`, sst => {
      sst.plan(1);
      sst.notOk(le.hyperplanesAreEqual(...planeSetC));
    });
  });
});
