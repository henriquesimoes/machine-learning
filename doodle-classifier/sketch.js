let ddc;
let trainButton;
let testButton;
let trainingProgress = 0;
let testingProgress = 0;
let nEpoch = 1;
let guess;
let categories;

function preload() {
	ddc = new DoodleClassifier();
	ddc.loadData();	
}

function setup() {
	select('#canvas-panel').child(createCanvas(280, 280));
	background(0);
	frameRate(100);
	textSize(16);
	textAlign(CENTER, CENTER);
	fill(255);
	
	ddc.prepareData();
	trainButton = select('#train');
	testButton = select('#test');
	guessButton = select('#guess');
	resetButton = select('#reset');
	guess = select('#guess-panel')
	categories = select('#categories');

	ddc.categories.forEach((cat) => {
		categories.option(cat.label);
	});

	trainButton.mouseClicked(() => {
		alert('Starting training... this might take a while to finish.');
		ddc.trainEpoch();
		console.log(`Epoch #${nEpoch++}`);
		alert('Training finished!');
	});
	testButton.mouseClicked(() => {
		alert('Starting testing... this might take a while to finish.');
		ddc.test();
		console.log(`Percentage: ${nf(ddc.accuracy, 2, 2)}`);
		alert(`Testing finished with ${nf(ddc.accuracy, 2, 2)}% of accuracy!`);
	});
	guessButton.mouseClicked(() => {
		let img = get();
		img.resize(28,28);
		img.loadPixels();
		inputs = [];
		for (let i=0; i < img.pixels.length; i+=4) {
			inputs.push(img.pixels[i] / 255);
		}
		let label = ddc.classify(inputs);
		guess.html(`I think you drew a ${label}`);
	});

	resetButton.mouseClicked(() => {
		background(0);
		guess.html('');
	});
}

function draw() {
	stroke(255);
	strokeWeight(10);
	if (mouseIsPressed) {
		line(pmouseX, pmouseY, mouseX, mouseY);
	}
}
