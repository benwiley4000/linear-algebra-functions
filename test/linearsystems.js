/**
 * Initial test cases adapted from Udacity's
 * Linear Algebra Refresher Course:
 * https://www.udacity.com/course/linear-algebra-refresher-course--ud953
 **/

const test = require('tape');
const l = require('../lib/linearsystems');
const h = require('../lib/hyperplanes');

test('Can perform Gaussian row operations on a system of linear equations', t => {
  const plane0 = new h.Hyperplane([1, 1, 1], 1);
  const plane1 = new h.Hyperplane([0, 1, 0], 2);
  const plane2 = new h.Hyperplane([1, 1, -1], 3);
  const plane3 = new h.Hyperplane([1, 0, -2], 2);
  const system0 = new l.LinearSystem([plane0, plane1, plane2, plane3]);

  const system1 = new l.LinearSystem([plane1, plane0, plane2, plane3]);
  t.test(
    'The following row operation is successful:\n' +
    'Swapping rows 0 and 1 in the system:\n' +
    system0 + '\n' +
    'produces the system:\n' +
    system1,
    st => {
      st.plan(1);
      st.deepEqual(l.swapRows(system0, 0, 1), system1);
    }
  );

  const system2 = new l.LinearSystem([plane1, plane3, plane2, plane0]);
  t.test(
    'The following row operation is successful:\n' +
    'Swapping rows 1 and 3 in the system:\n' +
    system1 + '\n' +
    'produces the system:\n' +
    system2,
    st => {
      st.plan(1);
      st.deepEqual(l.swapRows(system1, 1, 3), system2);
    }
  );

  const system3 = system1;
  t.test(
    'The following row operation is successful:\n' +
    'Swapping rows 3 and 1 in the system:\n' +
    system2 + '\n' +
    'produces the system:\n' +
    system3,
    st => {
      st.plan(1);
      st.deepEqual(l.swapRows(system2, 3, 1), system3);
    }
  );

  const system4 = system3;
  t.test(
    'The following row operation is successful:\n' +
    'Multiplying the scalar 1 by row 0 in the system:\n' +
    system3 + '\n' +
    'produces the system:\n' +
    system4,
    st => {
      st.plan(1);
      st.deepEqual(l.scalarMultiplyRow(system3, 1, 0), system4);
    }
  );

  const system5 = new l.LinearSystem([
    plane1,
    plane0,
    new h.Hyperplane([-1, -1, 1], -3),
    plane3
  ]);
  t.test(
    'The following row operation is successful:\n' +
    'Multiplying the scalar -1 by row 2 in the system:\n' +
    system4 + '\n' +
    'produces the system:\n' +
    system5,
    st => {
      st.plan(1);
      st.deepEqual(l.scalarMultiplyRow(system4, -1, 2), system5);
    }
  );

  const system6 = new l.LinearSystem([
    plane1,
    new h.Hyperplane([10, 10, 10], 10),
    new h.Hyperplane([-1, -1, 1], -3),
    plane3
  ]);
  t.test(
    'The following row operation is successful:\n' +
    'Multiplying the scalar 10 by row 1 in the system:\n' +
    system5 + '\n' +
    'produces the system:\n' +
    system6,
    st => {
      st.plan(1);
      st.deepEqual(l.scalarMultiplyRow(system5, 10, 1), system6);
    }
  );

  const system7 = system6;
  t.test(
    'The following row operation is successful:\n' +
    'Adding the scalar 0 multiplied by row 0 to row 1 in the system:\n' +
    system6 + '\n' +
    'produces the system:\n' +
    system7,
    st => {
      st.plan(1);
      st.deepEqual(l.addRowMultipleToAnother(system6, 0, 0, 1), system7);
    }
  );

  const system8 = new l.LinearSystem([
    plane1,
    new h.Hyperplane([10, 11, 10], 12),
    new h.Hyperplane([-1, -1, 1], -3),
    plane3
  ]);
  t.test(
    'The following row operation is successful:\n' +
    'Adding the scalar 1 multiplied by row 0 to row 1 in the system:\n' +
    system7 + '\n' +
    'produces the system:\n' +
    system8,
    st => {
      st.plan(1);
      st.deepEqual(l.addRowMultipleToAnother(system7, 1, 0, 1), system8);
    }
  );

  const system9 = new l.LinearSystem([
    new h.Hyperplane([-10, -10, -10], -10),
    new h.Hyperplane([10, 11, 10], 12),
    new h.Hyperplane([-1, -1, 1], -3),
    plane3
  ]);
  t.test(
    'The following row operation is successful:\n' +
    'Adding the scalar -1 multiplied by row 1 to row 0 in the system:\n' +
    system8 + '\n' +
    'produces the system:\n' +
    system9,
    st => {
      st.plan(1);
      st.deepEqual(l.addRowMultipleToAnother(system8, -1, 1, 0), system9);
    }
  );
});
