const assert = require('assert');
const Hyperplane = require('../hyperplanes').Hyperplane;

class LinearSystem {
  constructor (equations) {
    assert(equations.every(e => e instanceof Hyperplane));
    const len = equations[0].length;
    if (equations.some(e => e.length !== len)) {
      throw new Error('Cannot process system of equations in different dimensions');
    }
    this.equations = equations;
  }

  toString () {
    return this.equations.map((eq, i) => `${i}: ${eq}`).join('\n');
  }
}

module.exports = LinearSystem;
