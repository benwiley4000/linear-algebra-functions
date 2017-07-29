const subtract = require('./subtract');
const projection = require('./projection');

// the component of a given vector of size n,
// orthogonal to a given basis vector of size n
function orthogonalComponent (n, vec, basis) {
  return subtract(n, vec, projection(n, vec, basis));
}

module.exports = orthogonalComponent;
