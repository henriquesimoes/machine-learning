'use strict';

class Perceptron {
  constructor () {
    this.weights = [];
    this.learningRate = 0.01;

    for (let i = 0; i < 2; i++) {
      this.weights.push(random(-1, 1));
    }
  }

  guess (inputs) {
    let sum = 0;
    if (!(inputs.length && inputs.length >= this.weights.length)) {
      throw new TypeError(
        `Only ${inputs.length} provided (needed ${this.weights.length})...`);
    }
    this.weights.forEach((weight, i) => {
      sum += weight * inputs[i];
      
    });
    return this.sign(sum);
  }

  sign (value) {
    return value >= 0 ? 1 : -1;
  }

  train (inputs, target) {
    const guess = this.guess(inputs);

    const error = target - guess;

    this.weights.forEach((weight, i) => {
      this.weights[i] = weight + error * inputs[i] * this.learningRate;
    });
  }
}