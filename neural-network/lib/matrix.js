'use strict';

/**
 * @callback handleFunction
 * @param {Number} value
 * @param {Number} [i] Row index
 * @param {Number} [j] Column index
 */

/**
 * Simple Matrix class for manipulating matrix
 */
class Matrix {
  /**
   * Creates a two-dimension matrix
   * @param {Number} nRows Number of rows for the matrix
   * @param {Number} nCols Number of cols for the matrix
   */
  constructor (nRows, nCols) {
    this.nRows = nRows;
    this.nCols = nCols;

    this.values = new Array(this.nRows).fill(null);
    this.values.forEach((v, i, matrix) => {
      matrix[i] = new Array(this.nCols).fill(0);
    });
  }

  /**
   * Adds a scalar or matrix value to this matrix
   * @param {Number|Matrix} n Number or matrix to be added together
   * @return {Matrix} Updated matrix
   */
  add (n) {
    if (!(typeof n === 'number' || n instanceof Matrix)) {
      throw new TypeError(
        `n should be either a number or a Matrix object, but got a ${typeof n}...`);
    }

    if (n instanceof Matrix) {
      if (!this.matchDimensions(n)) {
        throw new TypeError(`n should have the same dimensions as the current matrix...`);
      }
    }

    if (typeof n === 'number') {
      return this.map(v => v += n);
    }

    return this.map((v, i, j) => v += n.values[i][j]);
  }

  /**
   * Multiplies a scalar value to this matrix
   * @param {Number} n Number to be multiplied by the whole matrix
   * @return {Matrix} This matrix object
   */
  mult (n) {
    if (!(typeof n === 'number')) {
      throw new TypeError(
        `n should be a number, but got a ${typeof n}...`);
    }
    return this.map(v => v * n);
  }

  /**
   * Attributes random values between 0-10 for every matrix value
   * @return {Matrix} Updated matrix
   */
  randomize () {
    return this.map(v => Math.floor(Math.random() * 10));
  }

  /**
   * Transposes the current matrix
   * @return {Matrix} This matrix
   */
  transpose () {
    const result = new Matrix(this.nCols, this.nRows);

    this.values.forEach((row, i) => {
      row.forEach((value, j) => {
        result.values[j][i] = value;
      });
    });

    this.values = result.values;

    return this;
  }

  /**
   * Console-table the matrix values
   */
  print () {
    console.table(this.values);
  }

  /**
   * Applies the given function for every matrix value
   * @param {handleFunction} fn
   * @return {Matrix} This matrix
   */
  map (fn) {
    this.values.forEach((row, i, matrix) => {
      row.forEach((value, j) => {
        matrix[i][j] = fn(value, i, j);
      });
    });
    return this;
  }

  /**
   * Checks if both matrix have the same dimensions
   * @param {Matrix} m
   * @return {Boolean}
   */
  matchDimensions (m) {
    let flag = false;
    if (this.values.length === m.values.length) {
      flag = true;
      this.values.forEach((row, i) => {
        if (row.length !== m.values[i].length) return false;
      });
    }
    return flag;
  }

  /**
   * Multiplies matrix a by b
   * @param {Matrix} a
   * @param {Matrix} b
   * @return {Matrix} Result matrix
   */
  static mult (a, b) {
    if (!(a instanceof Matrix && b instanceof Matrix)) {
      throw new TypeError(
        `a and b should both be Matrix objects, but got a ${typeof a} and a ${typeof b}...`);
    }
    if (a.nCols !== b.nRows) {
      throw new TypeError(`n should have the number of rows ` +
        `equals to the number of cols in the current matrix...`);
    }

    let result = new Matrix(a.nRows, b.nCols);

    result.values.forEach((row, i) => {
      row.forEach((value, j) => {
        let sum = 0;
        for (let k = 0; k < a.nCols; k++) {
          sum += b.values[i][k] * b.values[k][j];
        }
        result.values[i][j] = sum;
      });
    });

    return result;
  }

  /**
   * Transposes the current matrix
   * @param {Matrix} matrix
   * @return {Matrix} Transposed matrix
   */
  static transpose (matrix) {
    const result = new Matrix(matrix.nCols, matrix.nRows);

    matrix.values.forEach((row, i) => {
      row.forEach((value, j) => {
        result.values[j][i] = value;
      });
    });

    return result;
  }
}
