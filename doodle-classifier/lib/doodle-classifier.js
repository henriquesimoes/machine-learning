'use strict';
class DoodleClassifier {
  constructor (total = 1000) {
    this.cats = {
      code: 0,
      label: "cat",
      source: `cats${total}.bin`,
      training: [],
      testing: []
    };
    this.trains = {
      code: 1,
      label: "train",
      source: `trains${total}.bin`,
      training: [],
      testing: []
    };
    this.rainbows = {
      code: 2,
      label: "rainbow",
      source: `rainbows${total}.bin`,
      training: [],
      testing: []
    };

    this.cats.length = this.trains.length = this.rainbows.length = total;
    this.trainingPercentage = 0.8; // 80% of the data for training and 20% for testing
    this.length = 784; // Bytes length for a single image (28x28)
    this.training = [];
    this.testing = [];
    this.trainingCounter = 0;
    this.testingCounter = 0;
    this.correctAnswers = 0;
    this.x = 0;
    
    this.nn = new NeuralNetwork(784, 64, 3);  
  }

  loadData () {    
    this.cats.data = loadBytes(`data/${this.cats.source}`);
    this.trains.data = loadBytes(`data/${this.trains.source}`);
    this.rainbows.data = loadBytes(`data/${this.rainbows.source}`);
  }

  prepareData () {
    [this.cats, this.trains, this.rainbows].forEach((category) => this.prepareCategory(category));
    this.training = [].concat(this.cats.training, this.trains.training, this.rainbows.training);
    shuffle(this.training, true);
    this.testing = [].concat(this.cats.testing, this.trains.testing, this.rainbows.testing);
  }

  prepareCategory (category) {    
    for (let i=0; i< category.length; i++) {
      let offset = this.length * i;
      if (i < Math.floor(category.length * this.trainingPercentage)) {
        category.training.push({label: category.code, data: category.data.bytes.subarray(offset, offset + this.length)});
      } else {
        category.testing.push({label: category.code, data: category.data.bytes.subarray(offset, offset + this.length)});
      }
    }
  }

  trainEpoch () {
    shuffle(this.training, true);
    for (let i = 0; i < this.training.length; i++) {
      this.trainNext(i);
    }
  }

  trainNext(i) {
    let raw = Array.from(this.training[i].data);
    let inputs = raw.map(v => v / 255.0);
    let targets = new Array(this.nn.nOutputNodes).fill(0);
    targets[this.training[i].label] = 1;
    this.nn.train(inputs, targets);
    this.trainingCounter++;
  }

  test () {
    for (let i=0; i < this.testing.length; i++) {
      this.testNext(i);
    }
  }

  testNext(i) {
    let guess = this.nn
      .predict(Array.from(this.testing[i].data));
    let classification = guess.indexOf(max(guess));
    if (classification === this.testing[i].label) this.correctAnswers++;
    this.testingCounter++;
  }

  classify (imgPixels) {
    let guess = this.nn.predict(imgPixels);
    let classification = guess.indexOf(max(guess));
    switch (classification) {
      case this.cats.code: return this.cats.label; 
      case this.rainbows.code: return this.rainbows.label; 
      case this.trains.code: return this.trains.label; 
    }
  }

  get trainingLength () {
    return this.training.length;
  }

  get testingLength () {
    return this.testing.length;
  }

  get trainingProgress () {
    return this.trainingCounter / this.training.length * 100;
  }

  get testingProgress () {
    return this.testingCounter / this.testing.length * 100;
  }

  get accuracy () {
    return this.correctAnswers / this.testingCounter * 100 || 0;
  }
}