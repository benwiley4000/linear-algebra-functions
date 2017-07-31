/**
 * Initial test cases adapted from Udacity's
 * Linear Algebra Refresher Course:
 * https://www.udacity.com/course/linear-algebra-refresher-course--ud953
 **/

const test = require('tape');
const h = require('../lib/hyperplanes');
const isCloseToZero = require('../lib/util/isCloseToZero');

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
      hyperplane = new h.Hyperplane(coefficients, constant);
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
      line = new h.Line(xCoefficient, yCoefficient, constant);
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
    const hyperplane = new h.Hyperplane(coefficients, constant);
  }, hyperplaneErrorRegex);
});

test('Line cannot be defined with all-zero coefficients', t => {
  t.plan(1);
  const constant = random();
  t.throws(() => {
    const line = new h.Line(0, 0, constant);
  }, hyperplaneErrorRegex);
});
