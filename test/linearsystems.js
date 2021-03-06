/**
 * Initial test cases adapted from Udacity's
 * Linear Algebra Refresher Course:
 * https://www.udacity.com/course/linear-algebra-refresher-course--ud953
 **/

const test = require('tape');
const ls = require('../lib/linearsystems');
const le = require('../lib/linearequations');
const fix = require('./testhelpers/fix');

const systemReducer = ls.systemstore.reducer;
const systemActions = ls.systemstore.actions;

test('Can perform Gaussian row operations on a system of linear equations', t => {
  const plane0 = new le.LinearEquation([1, 1, 1], 1);
  const plane1 = new le.LinearEquation([0, 1, 0], 2);
  const plane2 = new le.LinearEquation([1, 1, -1], 3);
  const plane3 = new le.LinearEquation([1, 0, -2], 2);
  const system0 = new ls.LinearSystem([plane0, plane1, plane2, plane3]);

  const system1 = new ls.LinearSystem([plane1, plane0, plane2, plane3]);
  t.test(
    'The following row operation is successful:\n' +
    'Swapping rows 0 and 1 in the system:\n' +
    system0 + '\n' +
    'produces the system:\n' +
    system1,
    st => {
      st.plan(1);
      st.deepEqual(ls.swapRows(system0, 0, 1), system1);
    }
  );

  const system2 = new ls.LinearSystem([plane1, plane3, plane2, plane0]);
  t.test(
    'The following row operation is successful:\n' +
    'Swapping rows 1 and 3 in the system:\n' +
    system1 + '\n' +
    'produces the system:\n' +
    system2,
    st => {
      st.plan(1);
      st.deepEqual(ls.swapRows(system1, 1, 3), system2);
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
      st.deepEqual(ls.swapRows(system2, 3, 1), system3);
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
      st.deepEqual(ls.scalarMultiplyRow(system3, 1, 0), system4);
    }
  );

  const system5 = new ls.LinearSystem([
    plane1,
    plane0,
    new le.LinearEquation([-1, -1, 1], -3),
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
      st.deepEqual(ls.scalarMultiplyRow(system4, -1, 2), system5);
    }
  );

  const system6 = new ls.LinearSystem([
    plane1,
    new le.LinearEquation([10, 10, 10], 10),
    new le.LinearEquation([-1, -1, 1], -3),
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
      st.deepEqual(ls.scalarMultiplyRow(system5, 10, 1), system6);
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
      st.deepEqual(ls.addRowMultipleToAnother(system6, 0, 0, 1), system7);
    }
  );

  const system8 = new ls.LinearSystem([
    plane1,
    new le.LinearEquation([10, 11, 10], 12),
    new le.LinearEquation([-1, -1, 1], -3),
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
      st.deepEqual(ls.addRowMultipleToAnother(system7, 1, 0, 1), system8);
    }
  );

  const system9 = new ls.LinearSystem([
    new le.LinearEquation([-10, -10, -10], -10),
    new le.LinearEquation([10, 11, 10], 12),
    new le.LinearEquation([-1, -1, 1], -3),
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
      st.deepEqual(ls.addRowMultipleToAnother(system8, -1, 1, 0), system9);
    }
  );
});


test('Can translate action descriptors to Gaussian row operations', t => {
  const plane0 = new le.LinearEquation([1, 1, 1], 1);
  const plane1 = new le.LinearEquation([0, 1, 0], 2);
  const plane2 = new le.LinearEquation([1, 1, -1], 3);
  const plane3 = new le.LinearEquation([1, 0, -2], 2);
  const system0 = new ls.LinearSystem([plane0, plane1, plane2, plane3]);

  const system1 = new ls.LinearSystem([plane1, plane0, plane2, plane3]);
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

  const system2 = new ls.LinearSystem([plane1, plane3, plane2, plane0]);
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

  const system5 = new ls.LinearSystem([
    plane1,
    plane0,
    new le.LinearEquation([-1, -1, 1], -3),
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

  const system6 = new ls.LinearSystem([
    plane1,
    new le.LinearEquation([10, 10, 10], 10),
    new le.LinearEquation([-1, -1, 1], -3),
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

  const system8 = new ls.LinearSystem([
    plane1,
    new le.LinearEquation([10, 11, 10], 12),
    new le.LinearEquation([-1, -1, 1], -3),
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

  const system9 = new ls.LinearSystem([
    new le.LinearEquation([-10, -10, -10], -10),
    new le.LinearEquation([10, 11, 10], 12),
    new le.LinearEquation([-1, -1, 1], -3),
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
  const system0 = new ls.LinearSystem([
    new le.LinearEquation([1, 1, 1], 1),
    new le.LinearEquation([0, 1, 1], 2)
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
      const { system } = ls.toTriangularForm(system0);
      st.deepEqual(system, system0TriangularForm);
    }
  );

  const system1 = new ls.LinearSystem([
    new le.LinearEquation([1, 1, 1], 1),
    new le.LinearEquation([1, 1, 1], 2)
  ]);
  const system1TriangularForm = new ls.LinearSystem([
    new le.LinearEquation([1, 1, 1], 1),
    new le.LinearEquation([0, 0, 0], 1)
  ]);
  t.test(
    'The following triangular form conversion is successful:\n' +
    'The system:\n' +
    system1 + '\n' +
    'is converted to triangular form:\n' +
    system1TriangularForm,
    st => {
      st.plan(1);
      const { system } = ls.toTriangularForm(system1);
      st.deepEqual(system, system1TriangularForm);
    }
  );

  const system2 = new ls.LinearSystem([
    new le.LinearEquation([1, 1, 1], 1),
    new le.LinearEquation([0, 1, 0], 2),
    new le.LinearEquation([1, 1, -1], 3),
    new le.LinearEquation([1, 0, -2], 2)
  ]);
  const system2TriangularForm = new ls.LinearSystem([
    new le.LinearEquation([1, 1, 1], 1),
    new le.LinearEquation([0, 1, 0], 2),
    new le.LinearEquation([0, 0, -2], 2),
    new le.LinearEquation([0, 0, 0], 0)
  ]);
  t.test(
    'The following triangular form conversion is successful:\n' +
    'The system:\n' +
    system2 + '\n' +
    'is converted to triangular form:\n' +
    system2TriangularForm,
    st => {
      st.plan(1);
      const { system } = ls.toTriangularForm(system2);
      st.deepEqual(system, system2TriangularForm);
    }
  );

  const system3 = new ls.LinearSystem([
    new le.LinearEquation([0, 1, 1], 1),
    new le.LinearEquation([1, -1, 1], 2),
    new le.LinearEquation([1, 2, -5], 3)
  ]);
  const system3TriangularForm = new ls.LinearSystem([
    new le.LinearEquation([1, -1, 1], 2),
    new le.LinearEquation([0, 1, 1], 1),
    new le.LinearEquation([0, 0, -9], -2)
  ]);
  t.test(
    'The following triangular form conversion is successful:\n' +
    'The system:\n' +
    system3 + '\n' +
    'is converted to triangular form:\n' +
    system3TriangularForm,
    st => {
      st.plan(1);
      const { system } = ls.toTriangularForm(system3);
      st.deepEqual(system, system3TriangularForm);
    }
  );
});

test('Emits re-runnable actions for producing triangular form of a system of equations', t => {
  const system0 = new ls.LinearSystem([
    new le.LinearEquation([1, 1, 1], 1),
    new le.LinearEquation([0, 1, 1], 2)
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
      const { actions } = ls.toTriangularForm(system0);
      st.deepEqual(
        actions.reduce(ls.systemstore.reducer, system0),
        system0TriangularForm
      );
    }
  );

  const system1 = new ls.LinearSystem([
    new le.LinearEquation([1, 1, 1], 1),
    new le.LinearEquation([1, 1, 1], 2)
  ]);
  const system1TriangularForm = new ls.LinearSystem([
    new le.LinearEquation([1, 1, 1], 1),
    new le.LinearEquation([0, 0, 0], 1)
  ]);
  t.test(
    'The following triangular form conversion is successful:\n' +
    'The system:\n' +
    system1 + '\n' +
    'is converted to triangular form:\n' +
    system1TriangularForm,
    st => {
      st.plan(1);
      const { actions } = ls.toTriangularForm(system1);
      st.deepEqual(
        actions.reduce(ls.systemstore.reducer, system1),
        system1TriangularForm
      );
    }
  );

  const system2 = new ls.LinearSystem([
    new le.LinearEquation([1, 1, 1], 1),
    new le.LinearEquation([0, 1, 0], 2),
    new le.LinearEquation([1, 1, -1], 3),
    new le.LinearEquation([1, 0, -2], 2)
  ]);
  const system2TriangularForm = new ls.LinearSystem([
    new le.LinearEquation([1, 1, 1], 1),
    new le.LinearEquation([0, 1, 0], 2),
    new le.LinearEquation([0, 0, -2], 2),
    new le.LinearEquation([0, 0, 0], 0)
  ]);
  t.test(
    'The following triangular form conversion is successful:\n' +
    'The system:\n' +
    system2 + '\n' +
    'is converted to triangular form:\n' +
    system2TriangularForm,
    st => {
      st.plan(1);
      const { actions } = ls.toTriangularForm(system2);
      st.deepEqual(
        actions.reduce(ls.systemstore.reducer, system2),
        system2TriangularForm
      );
    }
  );

  const system3 = new ls.LinearSystem([
    new le.LinearEquation([0, 1, 1], 1),
    new le.LinearEquation([1, -1, 1], 2),
    new le.LinearEquation([1, 2, -5], 3)
  ]);
  const system3TriangularForm = new ls.LinearSystem([
    new le.LinearEquation([1, -1, 1], 2),
    new le.LinearEquation([0, 1, 1], 1),
    new le.LinearEquation([0, 0, -9], -2)
  ]);
  t.test(
    'The following triangular form conversion is successful:\n' +
    'The system:\n' +
    system3 + '\n' +
    'is converted to triangular form:\n' +
    system3TriangularForm,
    st => {
      st.plan(1);
      const { actions } = ls.toTriangularForm(system3);
      st.deepEqual(
        actions.reduce(ls.systemstore.reducer, system3),
        system3TriangularForm
      );
    }
  );
});

test('Computes reduced row echelon form of a system of equations', t => {
  const system0 = new ls.LinearSystem([
    new le.LinearEquation([1, 1, 1], 1),
    new le.LinearEquation([0, 1, 1], 2)
  ]);
  const system0Rref = new ls.LinearSystem([
    new le.LinearEquation([1, 0, 0], -1),
    new le.LinearEquation([0, 1, 1], 2)
  ]);
  t.test(
    'The following reduced row echelon form conversion is successful:\n' +
    'The system:\n' +
    system0 + '\n' +
    'is converted to reduced row echelon form:\n' +
    system0Rref,
    st => {
      st.plan(1);
      const { system } = ls.toRref(system0);
      st.deepEqual(system, system0Rref);
    }
  );

  const system1 = new ls.LinearSystem([
    new le.LinearEquation([1, 1, 1], 1),
    new le.LinearEquation([1, 1, 1], 2)
  ]);
  const system1Rref = new ls.LinearSystem([
    new le.LinearEquation([1, 1, 1], 1),
    new le.LinearEquation([0, 0, 0], 1)
  ]);
  t.test(
    'The following reduced row echelon form conversion is successful:\n' +
    'The system:\n' +
    system1 + '\n' +
    'is converted to reduced row echelon form:\n' +
    system1Rref,
    st => {
      st.plan(1);
      const { system } = ls.toRref(system1);
      st.deepEqual(system, system1Rref);
    }
  );

  const system2 = new ls.LinearSystem([
    new le.LinearEquation([1, 1, 1], 1),
    new le.LinearEquation([0, 1, 0], 2),
    new le.LinearEquation([1, 1, -1], 3),
    new le.LinearEquation([1, 0, -2], 2)
  ]);
  const system2Rref = new ls.LinearSystem([
    new le.LinearEquation([1, 0, 0], 0),
    new le.LinearEquation([0, 1, 0], 2),
    new le.LinearEquation([0, 0, 1], -1),
    new le.LinearEquation([0, 0, 0], 0)
  ]);
  t.test(
    'The following reduced row echelon form conversion is successful:\n' +
    'The system:\n' +
    system2 + '\n' +
    'is converted to reduced row echelon form:\n' +
    system2Rref,
    st => {
      st.plan(1);
      const { system } = ls.toRref(system2);
      st.deepEqual(system, system2Rref);
    }
  );

  const system3 = new ls.LinearSystem([
    new le.LinearEquation([0, 1, 1], 1),
    new le.LinearEquation([1, -1, 1], 2),
    new le.LinearEquation([1, 2, -5], 3)
  ]);
  const system3Rref = new ls.LinearSystem([
    new le.LinearEquation([1, 0, 0], 23/9),
    new le.LinearEquation([0, 1, 0], 7/9),
    new le.LinearEquation([0, 0, 1], 2/9)
  ]);
  t.test(
    'The following reduced row echelon form conversion is successful:\n' +
    'The system:\n' +
    system3 + '\n' +
    'is converted to reduced row echelon form:\n' +
    system3Rref,
    st => {
      st.plan(1);
      const { system } = ls.toRref(system3);
      st.deepEqual(system, system3Rref);
    }
  );
});

test('Can verify whether system is in reduced row echelon form', t => {
  const system0 = new ls.LinearSystem([
    new le.LinearEquation([1, 1, 1], 1),
    new le.LinearEquation([0, 1, 1], 2)
  ]);
  t.test(
    'This system IS NOT in reduced row echelon form:\n' +
    system0,
    st => {
      st.plan(1);
      st.notOk(ls.systemIsInRref(system0));
    }
  );

  const system0Rref = new ls.LinearSystem([
    new le.LinearEquation([1, 0, 0], -1),
    new le.LinearEquation([0, 1, 1], 2)
  ]);
  t.test(
    'This system IS in reduced row echeleon form:\n' +
    system0Rref,
    st => {
      st.plan(1);
      st.ok(ls.systemIsInRref(system0Rref));
    }
  );

  const system1 = new ls.LinearSystem([
    new le.LinearEquation([1, 1, 1], 1),
    new le.LinearEquation([1, 1, 1], 2)
  ]);
  t.test(
    'This system IS NOT in reduced row echeleon form:\n' +
    system1,
    st => {
      st.plan(1);
      st.notOk(ls.systemIsInRref(system1));
    }
  );

  const system1Rref = new ls.LinearSystem([
    new le.LinearEquation([1, 1, 1], 1),
    new le.LinearEquation([0, 0, 0], 1)
  ]);
  t.test(
    'This system IS in reduced row echeleon form:\n' +
    system1Rref,
    st => {
      st.plan(1);
      st.ok(ls.systemIsInRref(system1Rref));
    }
  );

  const system2 = new ls.LinearSystem([
    new le.LinearEquation([1, 1, 1], 1),
    new le.LinearEquation([0, 1, 0], 2),
    new le.LinearEquation([1, 1, -1], 3),
    new le.LinearEquation([1, 0, -2], 2)
  ]);
  t.test(
    'This system IS NOT in reduced row echeleon form:\n' +
    system2,
    st => {
      st.plan(1);
      st.notOk(ls.systemIsInRref(system2));
    }
  );

  const system2Rref = new ls.LinearSystem([
    new le.LinearEquation([1, 0, 0], 0),
    new le.LinearEquation([0, 1, 0], 2),
    new le.LinearEquation([0, 0, 1], -1),
    new le.LinearEquation([0, 0, 0], 0)
  ]);
  t.test(
    'This system IS in reduced row echeleon form:\n' +
    system2Rref,
    st => {
      st.plan(1);
      st.ok(ls.systemIsInRref(system2Rref));
    }
  );

  const system3 = new ls.LinearSystem([
    new le.LinearEquation([0, 1, 1], 1),
    new le.LinearEquation([1, -1, 1], 2),
    new le.LinearEquation([1, 2, -5], 3)
  ]);
  t.test(
    'This system IS NOT in reduced row echeleon form:\n' +
    system3,
    st => {
      st.plan(1);
      st.notOk(ls.systemIsInRref(system3));
    }
  );

  const system3Rref = new ls.LinearSystem([
    new le.LinearEquation([1, 0, 0], 23/9),
    new le.LinearEquation([0, 1, 0], 7/9),
    new le.LinearEquation([0, 0, 1], 2/9)
  ]);
  t.test(
    'This system IS in reduced row echeleon form:\n' +
    system3Rref,
    st => {
      st.plan(1);
      st.ok(ls.systemIsInRref(system3Rref));
    }
  );
});

test('Emits re-runnable actions for producing reduced row echelon form of a system of equations', t => {
  const system0 = new ls.LinearSystem([
    new le.LinearEquation([1, 1, 1], 1),
    new le.LinearEquation([0, 1, 1], 2)
  ]);
  const system0Rref = new ls.LinearSystem([
    new le.LinearEquation([1, 0, 0], -1),
    new le.LinearEquation([0, 1, 1], 2)
  ]);
  t.test(
    'The following reduced row echelon form conversion is successful:\n' +
    'The system:\n' +
    system0 + '\n' +
    'is converted to reduced row echelon form:\n' +
    system0Rref,
    st => {
      st.plan(1);
      const { actions } = ls.toRref(system0);
      st.deepEqual(
        actions.reduce(ls.systemstore.reducer, system0),
        system0Rref
      );
    }
  );

  const system1 = new ls.LinearSystem([
    new le.LinearEquation([1, 1, 1], 1),
    new le.LinearEquation([1, 1, 1], 2)
  ]);
  const system1Rref = new ls.LinearSystem([
    new le.LinearEquation([1, 1, 1], 1),
    new le.LinearEquation([0, 0, 0], 1)
  ]);
  t.test(
    'The following reduced row echelon form conversion is successful:\n' +
    'The system:\n' +
    system1 + '\n' +
    'is converted to reduced row echelon form:\n' +
    system1Rref,
    st => {
      st.plan(1);
      const { actions } = ls.toRref(system1);
      st.deepEqual(
        actions.reduce(ls.systemstore.reducer, system1),
        system1Rref
      );
    }
  );

  const system2 = new ls.LinearSystem([
    new le.LinearEquation([1, 1, 1], 1),
    new le.LinearEquation([0, 1, 0], 2),
    new le.LinearEquation([1, 1, -1], 3),
    new le.LinearEquation([1, 0, -2], 2)
  ]);
  const system2Rref = new ls.LinearSystem([
    new le.LinearEquation([1, 0, 0], 0),
    new le.LinearEquation([0, 1, 0], 2),
    new le.LinearEquation([0, 0, 1], -1),
    new le.LinearEquation([0, 0, 0], 0)
  ]);
  t.test(
    'The following reduced row echelon form conversion is successful:\n' +
    'The system:\n' +
    system2 + '\n' +
    'is converted to reduced row echelon form:\n' +
    system2Rref,
    st => {
      st.plan(1);
      const { actions } = ls.toRref(system2);
      st.deepEqual(
        actions.reduce(ls.systemstore.reducer, system2),
        system2Rref
      );
    }
  );

  const system3 = new ls.LinearSystem([
    new le.LinearEquation([0, 1, 1], 1),
    new le.LinearEquation([1, -1, 1], 2),
    new le.LinearEquation([1, 2, -5], 3)
  ]);
  const system3Rref = new ls.LinearSystem([
    new le.LinearEquation([1, 0, 0], 23/9),
    new le.LinearEquation([0, 1, 0], 7/9),
    new le.LinearEquation([0, 0, 1], 2/9)
  ]);
  t.test(
    'The following reduced row echelon form conversion is successful:\n' +
    'The system:\n' +
    system3 + '\n' +
    'is converted to reduced row echelon form:\n' +
    system3Rref,
    st => {
      st.plan(1);
      const { actions } = ls.toRref(system3);
      st.deepEqual(
        actions.reduce(ls.systemstore.reducer, system3),
        system3Rref
      );
    }
  );
});

test('Finds solution to a system of linear equations', t => {
  const system0 = new ls.LinearSystem([
    new le.LinearEquation([5.862, 1.178, -10.366], -8.15),
    new le.LinearEquation([-2.931, -0.589, 5.183], -4.075)
  ]);
  t.test(
    'For the following linear system:\n' +
    system0 + '\n' +
    'there is no solution',
    st => {
      st.plan(2);
      const { solutionType, solution } = ls.solveByGaussianElimination(system0);
      st.equal(solutionType, 'none');
      st.notOk(solution);
    }
  );

  const system1 = new ls.LinearSystem([
    new le.LinearEquation([8.631, 5.112, -1.816], -5.113),
    new le.LinearEquation([4.315, 11.132, -5.27], -6.775),
    new le.LinearEquation([-2.158, 3.01, -1.727], -0.831)
  ]);
  t.test(
    'For the following linear system:\n' +
    system1 + '\n' +
    'there are infinite solutions',
    st => {
      st.plan(2);
      const { solutionType, solution } = ls.solveByGaussianElimination(system1);
      st.equal(solutionType, 'infinite');
      st.ok(solution);
    }
  );

  const system2 = new ls.LinearSystem([
    new le.LinearEquation([5.262, 2.739, -9.878], -3.441),
    new le.LinearEquation([5.111, 6.358, 7.638], -2.152),
    new le.LinearEquation([2.016, -9.924, -1.367], -9.278),
    new le.LinearEquation([2.167, -13.593, -18.883], -10.567)
  ]);
  t.test(
    'For the following linear system:\n' +
    system2 + '\n' +
    'x = -1.177, y = 0.707, z = -0.083',
    st => {
      st.plan(5);
      const { solutionType, solution } = ls.solveByGaussianElimination(
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

test('Finds parameterized solution to system of linear equations', t => {
  const system0 = new ls.LinearSystem([
    new le.LinearEquation([0.786, 0.786, 0.588], -0.714),
    new le.LinearEquation([-0.138, -0.138, 0.244], 0.319)
  ]);
  t.test(
    'For the following linear system:\n' +
    system0 + '\n' +
    'x = -1.326 - t, y = t, z = 0.558',
    st => {
      st.plan(9);
      const { solutionType, solution } = ls.solveByGaussianElimination(system0);
      st.equal(solutionType, 'infinite');
      st.equal(solution.basePoint.length, 3);
      st.equal(solution.directionVectors.length, 1);
      st.equal(fix(solution.basePoint[0]), fix(-1.326));
      st.equal(fix(solution.basePoint[1]), fix(0));
      st.equal(fix(solution.basePoint[2]), fix(0.558));
      const t = solution.directionVectors[0];
      st.equal(fix(t[0]), fix(-1));
      st.equal(fix(t[1]), fix(1));
      st.equal(fix(t[2]), fix(0));
    }
  );

  const system1 = new ls.LinearSystem([
    new le.LinearEquation([8.631, 5.112, -1.816], -5.113),
    new le.LinearEquation([4.315, 11.132, -5.27], -6.775),
    new le.LinearEquation([-2.158, 3.01, -1.727], -0.831)
  ]);
  t.test(
    'For the following linear system:\n' +
    system1 + '\n' +
    'x = -0.301 - 0.091t, y = -0.492 + 0.509t, z = t',
    st => {
      st.plan(9);
      const { solutionType, solution } = ls.solveByGaussianElimination(system1);
      st.equal(solutionType, 'infinite');
      st.equal(solution.basePoint.length, 3);
      st.equal(solution.directionVectors.length, 1);
      st.equal(fix(solution.basePoint[0]), fix(-0.301));
      st.equal(fix(solution.basePoint[1]), fix(-0.492));
      st.equal(fix(solution.basePoint[2]), fix(0));
      const t = solution.directionVectors[0];
      st.equal(fix(t[0]), fix(-0.091));
      st.equal(fix(t[1]), fix(0.509));
      st.equal(fix(t[2]), fix(1));
    }
  );

  const system2 = new ls.LinearSystem([
    new le.LinearEquation([0.935, 1.76, -9.365], -9.955),
    new le.LinearEquation([0.187, 0.352, -1.873], -1.991),
    new le.LinearEquation([0.374, 0.704, -3.746], -3.982),
    new le.LinearEquation([-0.561, -1.056, 5.619], 5.973)
  ]);
  t.test(
    'For the following linear system:\n' +
    system2 + '\n' +
    'x = -10.647 - 1.882t + 10.016s, y = t, z = s',
    st => {
      st.plan(12);
      const { solutionType, solution } = ls.solveByGaussianElimination(system2);
      st.equal(solutionType, 'infinite');
      st.equal(solution.basePoint.length, 3);
      st.equal(solution.directionVectors.length, 2);
      st.equal(fix(solution.basePoint[0]), fix(-10.647));
      st.equal(fix(solution.basePoint[1]), fix(0));
      st.equal(fix(solution.basePoint[2]), fix(0));
      const t = solution.directionVectors[0];
      st.equal(fix(t[0]), fix(-1.882));
      st.equal(fix(t[1]), fix(1));
      st.equal(fix(t[2]), fix(0));
      const s = solution.directionVectors[1];
      st.equal(fix(s[0]), fix(10.016));
      st.equal(fix(s[1]), fix(0));
      st.equal(fix(s[2]), fix(1));
    }
  );
});
