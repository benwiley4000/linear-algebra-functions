/**
 * Initial test cases adapted from Udacity's
 * Linear Algebra Refresher Course:
 * https://www.udacity.com/course/linear-algebra-refresher-course--ud953
 **/

const test = require('tape');
const l = require('../lib/linearsystems');
const h = require('../lib/hyperplanes');
const fix = require('./testhelpers/fix');

const systemReducer = l.systemstore.reducer;
const systemActions = l.systemstore.actions;

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


test('Can translate action descriptors to Gaussian row operations', t => {
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
      st.plan(2);
      const action = systemActions.swapRows(0, 1);
      st.deepEqual(action, {
        type: systemActions.SWAP_ROWS,
        rowIndexA: 0,
        rowIndexB: 1
      });
      st.deepEqual(systemReducer(system0, action), system1);
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
      st.plan(2);
      const action = systemActions.swapRows(1, 3);
      st.deepEqual(action, {
        type: systemActions.SWAP_ROWS,
        rowIndexA: 1,
        rowIndexB: 3
      });
      st.deepEqual(systemReducer(system1, action), system2);
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
      st.plan(2);
      const action = systemActions.swapRows(3, 1);
      st.deepEqual(action, {
        type: systemActions.SWAP_ROWS,
        rowIndexA: 3,
        rowIndexB: 1
      });
      st.deepEqual(systemReducer(system2, action), system3);
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
      st.plan(2);
      const action = systemActions.scalarMultiplyRow(1, 0);
      st.deepEqual(action, {
        type: systemActions.SCALAR_MULTIPLY_ROW,
        scalar: 1,
        rowIndex: 0,
        tolerance: undefined
      });
      st.deepEqual(systemReducer(system3, action), system4);
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
      st.plan(2);
      const action = systemActions.scalarMultiplyRow(-1, 2);
      st.deepEqual(action, {
        type: systemActions.SCALAR_MULTIPLY_ROW,
        scalar: -1,
        rowIndex: 2,
        tolerance: undefined
      });
      st.deepEqual(systemReducer(system4, action), system5);
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
      st.plan(2);
      const action = systemActions.scalarMultiplyRow(10, 1);
      st.deepEqual(action, {
        type: systemActions.SCALAR_MULTIPLY_ROW,
        scalar: 10,
        rowIndex: 1,
        tolerance: undefined
      });
      st.deepEqual(systemReducer(system5, action), system6);
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
      st.plan(2);
      const action = systemActions.addRowMultipleToAnother(0, 0, 1);
      st.deepEqual(action, {
        type: systemActions.ADD_ROW_MULTIPLE_TO_ANOTHER,
        scalar: 0,
        srcRowIndex: 0,
        destRowIndex: 1,
        tolerance: undefined
      });
      st.deepEqual(systemReducer(system6, action), system7);
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
      st.plan(2);
      const action = systemActions.addRowMultipleToAnother(1, 0, 1);
      st.deepEqual(action, {
        type: systemActions.ADD_ROW_MULTIPLE_TO_ANOTHER,
        scalar: 1,
        srcRowIndex: 0,
        destRowIndex: 1,
        tolerance: undefined
      });
      st.deepEqual(systemReducer(system7, action), system8);
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
      st.plan(2);
      const action = systemActions.addRowMultipleToAnother(-1, 1, 0);
      st.deepEqual(action, {
        type: systemActions.ADD_ROW_MULTIPLE_TO_ANOTHER,
        scalar: -1,
        srcRowIndex: 1,
        destRowIndex: 0,
        tolerance: undefined
      });
      st.deepEqual(systemReducer(system8, action), system9);
    }
  );
});

test('Computes triangular form of a system of equations', t => {
  const system0 = new l.LinearSystem([
    new h.Hyperplane([1, 1, 1], 1),
    new h.Hyperplane([0, 1, 1], 2)
  ]);
  const system0TriangularForm = system0;
  t.test(
    'The following triangular form conversion is successful:\n' +
    'The system:\n' +
    system0 + '\n' +
    'is converted to triangular form:\n' +
    system0TriangularForm,
    st => {
      st.plan(1);
      const { system } = l.toTriangularForm(system0);
      st.deepEqual(system, system0TriangularForm);
    }
  );

  const system1 = new l.LinearSystem([
    new h.Hyperplane([1, 1, 1], 1),
    new h.Hyperplane([1, 1, 1], 2)
  ]);
  const system1TriangularForm = new l.LinearSystem([
    new h.Hyperplane([1, 1, 1], 1),
    new h.Hyperplane([0, 0, 0], 1)
  ]);
  t.test(
    'The following triangular form conversion is successful:\n' +
    'The system:\n' +
    system1 + '\n' +
    'is converted to triangular form:\n' +
    system1TriangularForm,
    st => {
      st.plan(1);
      const { system } = l.toTriangularForm(system1);
      st.deepEqual(system, system1TriangularForm);
    }
  );

  const system2 = new l.LinearSystem([
    new h.Hyperplane([1, 1, 1], 1),
    new h.Hyperplane([0, 1, 0], 2),
    new h.Hyperplane([1, 1, -1], 3),
    new h.Hyperplane([1, 0, -2], 2)
  ]);
  const system2TriangularForm = new l.LinearSystem([
    new h.Hyperplane([1, 1, 1], 1),
    new h.Hyperplane([0, 1, 0], 2),
    new h.Hyperplane([0, 0, -2], 2),
    new h.Hyperplane([0, 0, 0], 0)
  ]);
  t.test(
    'The following triangular form conversion is successful:\n' +
    'The system:\n' +
    system2 + '\n' +
    'is converted to triangular form:\n' +
    system2TriangularForm,
    st => {
      st.plan(1);
      const { system } = l.toTriangularForm(system2);
      st.deepEqual(system, system2TriangularForm);
    }
  );

  const system3 = new l.LinearSystem([
    new h.Hyperplane([0, 1, 1], 1),
    new h.Hyperplane([1, -1, 1], 2),
    new h.Hyperplane([1, 2, -5], 3)
  ]);
  const system3TriangularForm = new l.LinearSystem([
    new h.Hyperplane([1, -1, 1], 2),
    new h.Hyperplane([0, 1, 1], 1),
    new h.Hyperplane([0, 0, -9], -2)
  ]);
  t.test(
    'The following triangular form conversion is successful:\n' +
    'The system:\n' +
    system3 + '\n' +
    'is converted to triangular form:\n' +
    system3TriangularForm,
    st => {
      st.plan(1);
      const { system } = l.toTriangularForm(system3);
      st.deepEqual(system, system3TriangularForm);
    }
  );
});

test('Emits re-runnable actions for producing triangular form of a system of equations', t => {
  const system0 = new l.LinearSystem([
    new h.Hyperplane([1, 1, 1], 1),
    new h.Hyperplane([0, 1, 1], 2)
  ]);
  const system0TriangularForm = system0;
  t.test(
    'The following triangular form conversion is successful:\n' +
    'The system:\n' +
    system0 + '\n' +
    'is converted to triangular form:\n' +
    system0TriangularForm,
    st => {
      st.plan(1);
      const { actions } = l.toTriangularForm(system0);
      st.deepEqual(
        actions.reduce(l.systemstore.reducer, system0),
        system0TriangularForm
      );
    }
  );

  const system1 = new l.LinearSystem([
    new h.Hyperplane([1, 1, 1], 1),
    new h.Hyperplane([1, 1, 1], 2)
  ]);
  const system1TriangularForm = new l.LinearSystem([
    new h.Hyperplane([1, 1, 1], 1),
    new h.Hyperplane([0, 0, 0], 1)
  ]);
  t.test(
    'The following triangular form conversion is successful:\n' +
    'The system:\n' +
    system1 + '\n' +
    'is converted to triangular form:\n' +
    system1TriangularForm,
    st => {
      st.plan(1);
      const { actions } = l.toTriangularForm(system1);
      st.deepEqual(
        actions.reduce(l.systemstore.reducer, system1),
        system1TriangularForm
      );
    }
  );

  const system2 = new l.LinearSystem([
    new h.Hyperplane([1, 1, 1], 1),
    new h.Hyperplane([0, 1, 0], 2),
    new h.Hyperplane([1, 1, -1], 3),
    new h.Hyperplane([1, 0, -2], 2)
  ]);
  const system2TriangularForm = new l.LinearSystem([
    new h.Hyperplane([1, 1, 1], 1),
    new h.Hyperplane([0, 1, 0], 2),
    new h.Hyperplane([0, 0, -2], 2),
    new h.Hyperplane([0, 0, 0], 0)
  ]);
  t.test(
    'The following triangular form conversion is successful:\n' +
    'The system:\n' +
    system2 + '\n' +
    'is converted to triangular form:\n' +
    system2TriangularForm,
    st => {
      st.plan(1);
      const { actions } = l.toTriangularForm(system2);
      st.deepEqual(
        actions.reduce(l.systemstore.reducer, system2),
        system2TriangularForm
      );
    }
  );

  const system3 = new l.LinearSystem([
    new h.Hyperplane([0, 1, 1], 1),
    new h.Hyperplane([1, -1, 1], 2),
    new h.Hyperplane([1, 2, -5], 3)
  ]);
  const system3TriangularForm = new l.LinearSystem([
    new h.Hyperplane([1, -1, 1], 2),
    new h.Hyperplane([0, 1, 1], 1),
    new h.Hyperplane([0, 0, -9], -2)
  ]);
  t.test(
    'The following triangular form conversion is successful:\n' +
    'The system:\n' +
    system3 + '\n' +
    'is converted to triangular form:\n' +
    system3TriangularForm,
    st => {
      st.plan(1);
      const { actions } = l.toTriangularForm(system3);
      st.deepEqual(
        actions.reduce(l.systemstore.reducer, system3),
        system3TriangularForm
      );
    }
  );
});

test('Computes reduced row echelon form of a system of equations', t => {
  const system0 = new l.LinearSystem([
    new h.Hyperplane([1, 1, 1], 1),
    new h.Hyperplane([0, 1, 1], 2)
  ]);
  const system0Rref = new l.LinearSystem([
    new h.Hyperplane([1, 0, 0], -1),
    new h.Hyperplane([0, 1, 1], 2)
  ]);
  t.test(
    'The following reduced row echelon form conversion is successful:\n' +
    'The system:\n' +
    system0 + '\n' +
    'is converted to reduced row echelon form:\n' +
    system0Rref,
    st => {
      st.plan(1);
      const { system } = l.toRref(system0);
      st.deepEqual(system, system0Rref);
    }
  );

  const system1 = new l.LinearSystem([
    new h.Hyperplane([1, 1, 1], 1),
    new h.Hyperplane([1, 1, 1], 2)
  ]);
  const system1Rref = new l.LinearSystem([
    new h.Hyperplane([1, 1, 1], 1),
    new h.Hyperplane([0, 0, 0], 1)
  ]);
  t.test(
    'The following reduced row echelon form conversion is successful:\n' +
    'The system:\n' +
    system1 + '\n' +
    'is converted to reduced row echelon form:\n' +
    system1Rref,
    st => {
      st.plan(1);
      const { system } = l.toRref(system1);
      st.deepEqual(system, system1Rref);
    }
  );

  const system2 = new l.LinearSystem([
    new h.Hyperplane([1, 1, 1], 1),
    new h.Hyperplane([0, 1, 0], 2),
    new h.Hyperplane([1, 1, -1], 3),
    new h.Hyperplane([1, 0, -2], 2)
  ]);
  const system2Rref = new l.LinearSystem([
    new h.Hyperplane([1, 0, 0], 0),
    new h.Hyperplane([0, 1, 0], 2),
    new h.Hyperplane([0, 0, 1], -1),
    new h.Hyperplane([0, 0, 0], 0)
  ]);
  t.test(
    'The following reduced row echelon form conversion is successful:\n' +
    'The system:\n' +
    system2 + '\n' +
    'is converted to reduced row echelon form:\n' +
    system2Rref,
    st => {
      st.plan(1);
      const { system } = l.toRref(system2);
      st.deepEqual(system, system2Rref);
    }
  );

  const system3 = new l.LinearSystem([
    new h.Hyperplane([0, 1, 1], 1),
    new h.Hyperplane([1, -1, 1], 2),
    new h.Hyperplane([1, 2, -5], 3)
  ]);
  const system3Rref = new l.LinearSystem([
    new h.Hyperplane([1, 0, 0], 23/9),
    new h.Hyperplane([0, 1, 0], 7/9),
    new h.Hyperplane([0, 0, 1], 2/9)
  ]);
  t.test(
    'The following reduced row echelon form conversion is successful:\n' +
    'The system:\n' +
    system3 + '\n' +
    'is converted to reduced row echelon form:\n' +
    system3Rref,
    st => {
      st.plan(1);
      const { system } = l.toRref(system3);
      st.deepEqual(system, system3Rref);
    }
  );
});

test('Can verify whether system is in reduced row echelon form', t => {
  const system0 = new l.LinearSystem([
    new h.Hyperplane([1, 1, 1], 1),
    new h.Hyperplane([0, 1, 1], 2)
  ]);
  t.test(
    'This system IS NOT in reduced row echelon form:\n' +
    system0,
    st => {
      st.plan(1);
      st.notOk(l.systemIsInRref(system0));
    }
  );

  const system0Rref = new l.LinearSystem([
    new h.Hyperplane([1, 0, 0], -1),
    new h.Hyperplane([0, 1, 1], 2)
  ]);
  t.test(
    'This system IS in reduced row echeleon form:\n' +
    system0Rref,
    st => {
      st.plan(1);
      st.ok(l.systemIsInRref(system0Rref));
    }
  );

  const system1 = new l.LinearSystem([
    new h.Hyperplane([1, 1, 1], 1),
    new h.Hyperplane([1, 1, 1], 2)
  ]);
  t.test(
    'This system IS NOT in reduced row echeleon form:\n' +
    system1,
    st => {
      st.plan(1);
      st.notOk(l.systemIsInRref(system1));
    }
  );

  const system1Rref = new l.LinearSystem([
    new h.Hyperplane([1, 1, 1], 1),
    new h.Hyperplane([0, 0, 0], 1)
  ]);
  t.test(
    'This system IS in reduced row echeleon form:\n' +
    system1Rref,
    st => {
      st.plan(1);
      st.ok(l.systemIsInRref(system1Rref));
    }
  );

  const system2 = new l.LinearSystem([
    new h.Hyperplane([1, 1, 1], 1),
    new h.Hyperplane([0, 1, 0], 2),
    new h.Hyperplane([1, 1, -1], 3),
    new h.Hyperplane([1, 0, -2], 2)
  ]);
  t.test(
    'This system IS NOT in reduced row echeleon form:\n' +
    system2,
    st => {
      st.plan(1);
      st.notOk(l.systemIsInRref(system2));
    }
  );

  const system2Rref = new l.LinearSystem([
    new h.Hyperplane([1, 0, 0], 0),
    new h.Hyperplane([0, 1, 0], 2),
    new h.Hyperplane([0, 0, 1], -1),
    new h.Hyperplane([0, 0, 0], 0)
  ]);
  t.test(
    'This system IS in reduced row echeleon form:\n' +
    system2Rref,
    st => {
      st.plan(1);
      st.ok(l.systemIsInRref(system2Rref));
    }
  );

  const system3 = new l.LinearSystem([
    new h.Hyperplane([0, 1, 1], 1),
    new h.Hyperplane([1, -1, 1], 2),
    new h.Hyperplane([1, 2, -5], 3)
  ]);
  t.test(
    'This system IS NOT in reduced row echeleon form:\n' +
    system3,
    st => {
      st.plan(1);
      st.notOk(l.systemIsInRref(system3));
    }
  );

  const system3Rref = new l.LinearSystem([
    new h.Hyperplane([1, 0, 0], 23/9),
    new h.Hyperplane([0, 1, 0], 7/9),
    new h.Hyperplane([0, 0, 1], 2/9)
  ]);
  t.test(
    'This system IS in reduced row echeleon form:\n' +
    system3Rref,
    st => {
      st.plan(1);
      st.ok(l.systemIsInRref(system3Rref));
    }
  );
});

test('Emits re-runnable actions for producing reduced row echelon form of a system of equations', t => {
  const system0 = new l.LinearSystem([
    new h.Hyperplane([1, 1, 1], 1),
    new h.Hyperplane([0, 1, 1], 2)
  ]);
  const system0Rref = new l.LinearSystem([
    new h.Hyperplane([1, 0, 0], -1),
    new h.Hyperplane([0, 1, 1], 2)
  ]);
  t.test(
    'The following reduced row echelon form conversion is successful:\n' +
    'The system:\n' +
    system0 + '\n' +
    'is converted to reduced row echelon form:\n' +
    system0Rref,
    st => {
      st.plan(1);
      const { actions } = l.toRref(system0);
      st.deepEqual(
        actions.reduce(l.systemstore.reducer, system0),
        system0Rref
      );
    }
  );

  const system1 = new l.LinearSystem([
    new h.Hyperplane([1, 1, 1], 1),
    new h.Hyperplane([1, 1, 1], 2)
  ]);
  const system1Rref = new l.LinearSystem([
    new h.Hyperplane([1, 1, 1], 1),
    new h.Hyperplane([0, 0, 0], 1)
  ]);
  t.test(
    'The following reduced row echelon form conversion is successful:\n' +
    'The system:\n' +
    system1 + '\n' +
    'is converted to reduced row echelon form:\n' +
    system1Rref,
    st => {
      st.plan(1);
      const { actions } = l.toRref(system1);
      st.deepEqual(
        actions.reduce(l.systemstore.reducer, system1),
        system1Rref
      );
    }
  );

  const system2 = new l.LinearSystem([
    new h.Hyperplane([1, 1, 1], 1),
    new h.Hyperplane([0, 1, 0], 2),
    new h.Hyperplane([1, 1, -1], 3),
    new h.Hyperplane([1, 0, -2], 2)
  ]);
  const system2Rref = new l.LinearSystem([
    new h.Hyperplane([1, 0, 0], 0),
    new h.Hyperplane([0, 1, 0], 2),
    new h.Hyperplane([0, 0, 1], -1),
    new h.Hyperplane([0, 0, 0], 0)
  ]);
  t.test(
    'The following reduced row echelon form conversion is successful:\n' +
    'The system:\n' +
    system2 + '\n' +
    'is converted to reduced row echelon form:\n' +
    system2Rref,
    st => {
      st.plan(1);
      const { actions } = l.toRref(system2);
      st.deepEqual(
        actions.reduce(l.systemstore.reducer, system2),
        system2Rref
      );
    }
  );

  const system3 = new l.LinearSystem([
    new h.Hyperplane([0, 1, 1], 1),
    new h.Hyperplane([1, -1, 1], 2),
    new h.Hyperplane([1, 2, -5], 3)
  ]);
  const system3Rref = new l.LinearSystem([
    new h.Hyperplane([1, 0, 0], 23/9),
    new h.Hyperplane([0, 1, 0], 7/9),
    new h.Hyperplane([0, 0, 1], 2/9)
  ]);
  t.test(
    'The following reduced row echelon form conversion is successful:\n' +
    'The system:\n' +
    system3 + '\n' +
    'is converted to reduced row echelon form:\n' +
    system3Rref,
    st => {
      st.plan(1);
      const { actions } = l.toRref(system3);
      st.deepEqual(
        actions.reduce(l.systemstore.reducer, system3),
        system3Rref
      );
    }
  );
});

test('Finds solution to a system of linear equations', t => {
  const system0 = new l.LinearSystem([
    new h.Hyperplane([5.862, 1.178, -10.366], -8.15),
    new h.Hyperplane([-2.931, -0.589, 5.183], -4.075)
  ]);
  t.test(
    'For the following linear system:\n' +
    system0 + '\n' +
    'there is no solution',
    st => {
      st.plan(2);
      const { solutionType, solution } = l.solveByGaussianElimination(system0);
      st.equal(solutionType, 'none');
      st.notOk(solution);
    }
  );

  const system1 = new l.LinearSystem([
    new h.Hyperplane([8.631, 5.112, -1.816], -5.113),
    new h.Hyperplane([4.315, 11.132, -5.27], -6.775),
    new h.Hyperplane([-2.158, 3.01, -1.727], -0.831)
  ]);
  t.test(
    'For the following linear system:\n' +
    system1 + '\n' +
    'there are infinite solutions',
    st => {
      st.plan(2);
      const { solutionType, solution } = l.solveByGaussianElimination(system1);
      st.equal(solutionType, 'infinite');
      st.notOk(solution);
    }
  );

  const system2 = new l.LinearSystem([
    new h.Hyperplane([5.262, 2.739, -9.878], -3.441),
    new h.Hyperplane([5.111, 6.358, 7.638], -2.152),
    new h.Hyperplane([2.016, -9.924, -1.367], -9.278),
    new h.Hyperplane([2.167, -13.593, -18.883], -10.567)
  ]);
  t.test(
    'For the following linear system:\n' +
    system2 + '\n' +
    'x = -1.177, y = 0.707, z = -0.083',
    st => {
      st.plan(5);
      const { solutionType, solution } = l.solveByGaussianElimination(
        system2,
        // we lose some accuracy with all the row operations
        // so we need a higher tolerance for zero-ish values
        0.04
      );
      st.equal(solutionType, 'single');
      st.ok(solution);
      st.equal(fix(solution[0]), fix(-1.177));
      st.equal(fix(solution[1]), fix(0.707));
      st.equal(fix(solution[2]), fix(-0.083));
    }
  );
});
