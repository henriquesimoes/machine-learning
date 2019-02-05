'use strict';
class DoodleClassifier {
  constructor () {
    this.categories = [];
    this.trainingPercentage = 0.8; // 80% of the data for training and 20% for testing
    this.length = 784; // Bytes length for a single image (28x28)
    this.training = [];
    this.testing = [];
    this.trainingCounter = 0;
    this.testingCounter = 0;
    this.correctAnswers = 0;
  }

  loadData () {
    loadJSON('data/categories.json', (json) => {
      this.categories = Object.values(json);
      this.categories.forEach((category, i) => {
        this.categories[i].data = loadBytes(`data/${category.source}`);
      });
      this.nn = new NeuralNetwork(784, 64, this.categories.length, 0.2);  
    });
  }

  prepareData () {
    let training = [];
    let testing = [];
    for (let i=0; i < this.categories.length; i++) {
      this.prepareCategory(i);
      training.push(this.categories[i].training);
      testing.push(this.categories[i].testing);      
    }
    
    this.training = [].concat.apply([], training);
    shuffle(this.training, true);
    this.testing = [].concat.apply([], testing);
  }

  prepareCategory (j) {    
    for (let i=0; i < this.categories[j].length; i++) {
      let offset = this.length * i;
      if (i < Math.floor(this.categories[j].length * this.trainingPercentage)) {
        this.categories[j].training.push({
          label: this.categories[j].code,
          data: this.categories[j].data.bytes.subarray(offset, offset + this.length)
        });
      } else {
        this.categories[j].testing.push({
          label: this.categories[j].code,
          data: this.categories[j].data.bytes.subarray(offset, offset + this.length)
        });
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
    const category = this.categories.filter((c) => c.code === classification);
    return category.shift().label;
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