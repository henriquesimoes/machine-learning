'use strict';

class NeuralNetwork {
  constructor (nInputNodes, nHiddenNodes, nOutputNodes) {
    this.nInputNodes = nInputNodes;
    this.nHiddenNodes = nHiddenNodes;
    this.nOutputNodes = nOutputNodes;

    this.weightsIH = new Matrix(this.nHiddenNodes, this.nInputNodes).randomize();
    this.weightsHO = new Matrix(this.nOutputNodes, this.nHiddenNodes).randomize();
    this.hiddenBias = new Matrix(this.nHiddenNodes, 1).randomize();
    this.outputBias = new Matrix(this.nOutputNodes, 1).randomize();
    this.activation = (x) => 1 / (1 + Math.exp(-x));
  }

  changeActivation (fn) {
    if (typeof fn !== 'function')
      throw new TypeError(`activation has to be a function, but got a ${typeof fn}...`);
    this.activation = fn;
  }

  /**
   * Guesses the output
   * @param {Array<Number>|Matrix} inputs
   * @return {Array<Number>} Guess
   */
  feedforward (inputs) {
    if (inputs instanceof Array) inputs = Matrix.fromArray(inputs);
    else if(!(inputs instanceof Matrix))
      throw new TypeError(`Expected a array or a Matrix, but got a ${typeof inputs}`);

    if (inputs.nRows !== this.nInputNodes)
      throw TypeError(`Wrong number of inputs provided. Expected ${this.nInputNodes} input(s)`);

    const hidden = Matrix
      .mult(this.weightsIH, inputs)
      .add(this.hiddenBias)
      .map(this.activation);

    const output = Matrix
      .mult(this.weightsHO, hidden)
      .add(this.outputBias)
      .map(this.activation);

    return output.toArray();
  }
}