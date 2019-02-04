let nn;
const total = 5000;
let cats = {
	code: 0,
	label: "cat",
	source: `cats${total}.bin`,
	training: [],
	testing: []
};
let trains = {
	code: 1,
	label: "train",
	source: `trains${total}.bin`,
	training: [],
	testing: []
};
let rainbows = {
	code: 2,
	label: "rainbow",
	source: `rainbows${total}.bin`,
	training: [],
	testing: []
};

const trainingPercentage = 0.8; // 80% of the data for training and 20% for testing
const length = 784; // Bytes length for a single image (28x28)
let trainingProgress = 0;
let testingProgress = 0;
let correctAnswers = 0;
let accuracy = 0;
let training;
let testing;
let counter = 0;

function preload() {
	cats.data = loadBytes(`data/${cats.source}`);
	trains.data = loadBytes(`data/${trains.source}`);
	rainbows.data = loadBytes(`data/${rainbows.source}`);
	cats.length = trains.length = rainbows.length = total;
}

function setup() {
	createCanvas(280, 280);
	[cats, trains, rainbows].forEach((category) => prepareData(category));
	frameRate(100);
	nn = new NeuralNetwork(784, 64, 3);

	training = [].concat(cats.training, trains.training, rainbows.training);
	shuffle(training, true);
	// trainEpoch(training);
	
	testing = [].concat(cats.testing, trains.testing, rainbows.testing);
	// test(testing);
}

function draw() {
	background(0);
	textSize(16);
	textAlign(CENTER, CENTER)
	fill(255);

	let testingCoutner = ++counter - training.length;
	if (counter < training.length) {
		trainNext(training, counter);
	} else if (testingCoutner < testing.length) {
		testNext(testing, testingCoutner);
		accuracy = Math.round(correctAnswers / testingCoutner * 100);
	}

	text(`Tranining progress: ${trainingProgress}%`, width / 2, height / 4);
	text(`Testing progress: ${testingProgress}%`, width / 2, height / 2);
	text(`Accuracy: ${accuracy}%`, width / 2, height * 3 / 4);
}

function prepareData (category) {
	for (let i=0; i< category.length; i++) {
		let offset = length * i;
		if (i < Math.floor(category.length * trainingPercentage)) {
			category.training.push({label: category.code, data: category.data.bytes.subarray(offset, offset + length)});
		} else {
			category.testing.push({label: category.code, data: category.data.bytes.subarray(offset, offset + length)});
		}
	}
}

function trainEpoch (training) {
	shuffle(training, true);
	for (let i = 0; i < training.length; i++) {
		trainNext(training, i);
	}
}

function trainNext(training, i) {
	let raw = Array.from(training[i].data);
	let inputs = raw.map(v => v / 255.0);
	let targets = new Array(nn.nOutputNodes).fill(0);
	targets[training[i].label] = 1;
	nn.train(inputs, targets);

	trainingProgress = Math.round(i / training.length * 100);
}

function test (testing) {
	for (let i=0; i < testing.length; i++) {
		testNext(testing, i);
	}
	console.log(correctAnswers / testing.length);
}

function testNext(testing, i) {
	let guess = nn
		.predict(Array.from(testing[i].data));
	let classification = guess.indexOf(max(guess));
	if (classification === testing[i].label) correctAnswers++;
	testingProgress = Math.round(i / testing.length * 100);
}
