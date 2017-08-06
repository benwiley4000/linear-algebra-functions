# pure-linear-algebra
A collection of types and pure functions for basic linear algebra operations, written in pure JavaScript.

Works in Node and the browser!

This library is suited for interactive computation applications involving vectors, lines, planes, hyperplanes, and systems of equations. It is particularly useful for Gaussian Elimination, for which it provides a reducer and action set which can be used to "re-play" the solution process, possibly using a state-management library like [redux](https://github.com/reactjs/redux). It does not do matrix operations.

This library is not built with the ideal of performance at the forefront, so depending on the application, another library (perhaps [linear-algebra](https://www.npmjs.com/package/linear-algebra)) could be better suited.

Initial test cases adapted from Udacity's [Linear Algebra Refresher Course](https://www.udacity.com/course/linear-algebra-refresher-course--ud953).

## contributing
Don't hesitate to submit additional documentation, test cases, bug fixes or features via pull request!

If you think something is wrong with the API (totally plausible), please open an issue for discussion before submitting a pull rquest.
