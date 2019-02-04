let ddc;

function preload() {
	ddc = new DoodleClassifier();
	ddc.loadData();
}

function setup() {
	createCanvas(280, 280);
	frameRate(100);
	ddc.prepareData();
}

function draw() {
	let counter = frameCount - 1;
	background(0);
	textSize(16);
	textAlign(CENTER, CENTER)
	fill(255);

	let testingCounter = counter - ddc.trainingLength;
	if (counter < ddc.trainingLength) {
		ddc.trainNext(counter);
	} else if (testingCounter < ddc.testingLength) {
		ddc.testNext(testingCounter);
	}

	text(`Tranining progress: ${ddc.trainingProgress}%`, width / 2, height / 4);
	text(`Testing progress: ${ddc.testingProgress}%`, width / 2, height / 2);
	text(`Accuracy: ${ddc.accuracy}%`, width / 2, height * 3 / 4);
}
