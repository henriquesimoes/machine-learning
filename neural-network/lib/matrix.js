'use strict';

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

    this.values.forEach((row, i) => {
      row.forEach((v, j, row) => {
        if (typeof n === 'number') {
          row[j] += n;
        } else {
          row[j] += n.values[i][j];
        }
      });
    });

    return this;
  }

  /**
   * Multiplies a scalar or matrix value to this matrix
   * @param {Number|Matrix} n Number or matrix to be multiplied together
   * @return {Matrix} Result matrix
   */
  mult (n) {
    if (!(typeof n === 'number' || n instanceof Matrix)) {
      throw new TypeError(
        `n should be either a number or a Matrix object, but got a ${typeof n}...`);
    }

    if (n instanceof Matrix) {
      if (this.nCols !== n.nRows) {
        throw new TypeError(`n should have the number of rows ` +
          `equals to the number of cols in the current matrix...`);
      }

      let result = new Matrix(this.nRows, n.nCols);
      const a = this.values;
      const b = n.values;

      result.values.forEach((row, i) => {
        row.forEach((value, j) => {
          let sum = 0;
          for (let k = 0; k < this.nCols; k++) {
            sum += a[i][k] * b[k][j];
          }
          result.values[i][j] = sum;
        });
      });

      return result;
    } else {
      this.values.forEach((row, i) => {
        row.forEach((v, j, row) => {
          if (typeof n === 'number') {
            row[j] *= n;
          }
        });
      });
      return this;
    }
  }

  /**
   * Attributes random values between 0-10 for every matrix value
   * @return {Matrix} Updated matrix
   */
  randomize () {
    this.values.forEach((row) => {
      row.forEach((v, i, row) => {
        row[i] = Math.floor(Math.random() * 10);
      });
    });
    return this;
  }

  /**
   * Transposes the current matrix
   * @return {Matrix} Transposed matrix
   */
  transpose () {
    const result = new Matrix(this.nCols, this.nRows);

    this.values.forEach((row, i) => {
      row.forEach((value, j) => {
        result.values[j][i] = value;
      });
    });

    return result;
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
}
