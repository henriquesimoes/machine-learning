let nn;

let cats = {
	code: 0,
	label: "cat",
	source: "cats1000.bin",
	training: [],
	testing: []
};
let trains = {
	code: 1,
	label: "train",
	source: "trains1000.bin",
	training: [],
	testing: []
};
let rainbows = {
	code: 2,
	label: "rainbow",
	source: "rainbows1000.bin",
	training: [],
	testing: []
};

const trainingPercentage = 0.8; // 80% of the data for training and 20% for testing
const length = 784; // Bytes length for a single image (28x28)

function preload() {
	cats.data = loadBytes(`data/${cats.source}`);
	trains.data = loadBytes(`data/${trains.source}`);
	rainbows.data = loadBytes(`data/${rainbows.source}`);
	cats.length = trains.length = rainbows.length = 1000;
}

function setup() {
	createCanvas(280, 280);
	background(0);
	[cats, trains, rainbows].forEach((category) => prepareData(category));

	nn = new NeuralNetwork(784, 64, 3);

	let training = [];
	training = training.concat(cats.training, trains.training, rainbows.training);
	shuffle(training, true);

	for (let i = 0; i < training.length; i++) {
		let raw = Array.from(training[i].data);
		let inputs = raw.map(v => v / 255.0);
		let label = training[i].label;
		let targets = new Array(3).fill(0);
		targets[label] = 1;
		nn.train(inputs, targets);
	}
}

function draw() {
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