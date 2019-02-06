'use strict';
class DoodleClassifier {
  constructor () {
    this.trainingPercentage = 0.8; // 80% of the data for training and 20% for testing
    this.length = 784; // Bytes length for a single image (28x28)
    this.allCategories;
    this.nnINodes = this.length;
    this.nnHNodes = 64;
    this.categories = [];
    this.training = [];
    this.testing = [];
    this.trainingCounter = 0;
    this.testingCounter = 0;
    this.correctAnswers = 0;
  }

  loadData () {
    loadJSON('data/categories.json', (json) => {
      this.allCategories = Object.values(json);
      this.allCategories.forEach((category, i) => {
        this.allCategories[i].data = loadBytes(`data/${category.source}`);
      });
      this.categories = this.allCategories.slice();
      this.nn = new NeuralNetwork(this.nnINodes, this.nnHNodes, this.allCategories.length, 0.2);  
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
          code: this.categories[j].code,
          label: j,
          data: this.categories[j].data.bytes.subarray(offset, offset + this.length)
        });
      } else {
        this.categories[j].testing.push({
          code: this.categories[j].code,
          label: j,
          data: this.categories[j].data.bytes.subarray(offset, offset + this.length)
        });
      }
    }
  }

  preTraining () {
    shuffle(this.training, true);
    this.trainingCounter = 0;
  }

  trainEpoch () {
    this.preTraining();
    for (let i = 0; i < this.training.length; i++) {
      this.trainNext(i);
    }
  }

  trainNext(i, displayImg) {
    if (displayImg) displayImg(Array.from(this.training[i].data));
    let inputs = this.normalizeImg(this.training[i].data);
    let targets = new Array(this.nn.nOutputNodes).fill(0);
    targets[this.training[i].label] = 1;
    this.nn.train(inputs, targets);
    this.trainingCounter++;
  }

  preTesting() {
    this.testingCounter = 0;
    this.correctAnswers = 0;
  }

  test () {
    for (let i=0; i < this.testing.length; i++) {
      this.testNext(i);
    }
  }

  testNext(i, displayImg) {
    let correct = false;
    let inputs = this.normalizeImg(this.testing[i].data);
    let guess = this.nn
      .predict(inputs);
    let classification = guess.indexOf(max(guess));
    if (classification === this.testing[i].label) {
      this.correctAnswers++;
      correct = true;
    }
    if (displayImg) displayImg(Array.from(this.testing[i].data), correct);
    this.testingCounter++;
  }

  normalizeImg(rawImg) {
    let raw = Array.from(rawImg);
    return raw.map(v => v / 255.0);
  }

  classify (imgPixels) {
    let guess = this.nn.predict(imgPixels);
    let classification = guess.indexOf(max(guess));
    const category = this.categories.filter((_, i) => i === classification);
    return category.shift().label;
  }

  changeCategories (arr) {
    this.categories = this.allCategories.filter(c => arr.indexOf(c.code) > -1);
    this.updateData();
    this.nn = new NeuralNetwork(this.nnINodes, this.nnHNodes, this.categories.length);
  }
  
  updateData () {
    let training = [];
    let testing = [];
    for (let i=0; i < this.categories.length; i++) {
      this.categories[i].training.forEach(t => t.label = i);
      this.categories[i].testing.forEach(t => t.label = i);
      training.push(this.categories[i].training);
      testing.push(this.categories[i].testing);
    }
    
    this.training = [].concat.apply([], training);
    shuffle(this.training, true);
    this.testing = [].concat.apply([], testing);
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