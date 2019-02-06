let ddc;
let trainingProgress = 0;
let testingProgress = 0;
let nEpoch = 1;
let categories = [];
let saved = true;
let training = false;
let testing = false;

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
	let trainButton = select('#train');
	let testButton = select('#test');
	let guessButton = select('#guess');
	let resetButton = select('#reset');
	let categoryButton = select('#cat-btn');
	let guess = select('#guess-panel')
	let categoriesPanel = select('#categories');

	ddc.allCategories.forEach((cat) => {
		let ckb = createCheckbox(cat.label, true);
		ckb.changed(() => saved = false);
		categories.push(ckb);
		let category = createDiv('').child(ckb);
		categoriesPanel.child(category);
	});	

	trainButton.mouseClicked(() => {
		if (!saved) changeCategories();
		ddc.preTraining();
		training = !training;
	});
	testButton.mouseClicked(() => {
		ddc.preTesting();
		testing = !testing;
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
	categoryButton.mouseClicked(changeCategories);
}

function draw() {
	if (training) {
		train();
	} else if (testing) {
		test();
	}
	else {
		stroke(255);
		strokeWeight(10);
		if (mouseIsPressed) {
			line(pmouseX, pmouseY, mouseX, mouseY);
		}
	}
}

function changeCategories() {
	let activated = categories.filter(cbx => cbx.checked());
	activated = activated.map(a => {
		return ddc.allCategories
			.find((c) => c.label === a.elt.innerText)
			.code;
	});
	ddc.changeCategories(activated);
	saved = true;
}

function train () {
	if (ddc.trainingCounter < ddc.trainingLength) {
		ddc.trainNext(ddc.trainingCounter, displayImg);
	} else {
		training = false;
		alert('Training finished!');
		background(0);
	}
}

function test () {
	if (ddc.testingCounter < ddc.testingLength) {
		ddc.testNext(ddc.testingCounter, displayImg);
	} else {
		testing = false;
		let accuracy = nf(ddc.accuracy, 2, 2);
		console.log(`Percentage: ${accuracy}`);
		alert(`Testing finished with ${accuracy}% of accuracy!`);
		background(0);
	}
}

function displayImg (imgData, correct) {
	background(0);
	let img = createImage(28, 28);
	img.loadPixels();
	img.pixels.forEach((_, i) => {
		if (correct === undefined) {
			// Gray-scale drawing
			img.pixels[i] = imgData[Math.floor(i/4)];
		} else if (correct) {
			// Green drawing
			switch (i%4) {
				case 1:
				case 3: img.pixels[i] = imgData[Math.floor(i/4)];
			}
		} else {
			// Red drawing
			switch (i%4) {
				case 0:
				case 3: img.pixels[i] = imgData[Math.floor(i/4)];
			}
		}
	});
	img.updatePixels();
	img.resize(280, 280);
	img.updatePixels();
	
	image(img, 0, 0);
}
