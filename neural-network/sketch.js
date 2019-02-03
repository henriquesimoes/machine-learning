'use strict';
let n;
let lrSlider;
let hnSlider;
let rSlider;
let reset;

const trainingData = [
	{
		"inputs": [1,0],
		"targets": [1]
	},
	{
		"inputs": [1,1],
		"targets": [0]
	},
	{
		"inputs": [0,1],
		"targets": [1]
	},
	{
		"inputs": [0,0],
		"targets": [0]
	}
];

function setup() {
	createCanvas(400, 400);

	lrSlider = select('#learning-rate-slider');
	hnSlider = select('#hidden-nodes-slider');
	rSlider = select('#resolution-slider');
	n = new NeuralNetwork(2, hnSlider.value(), 1, lrSlider.value());
	
	lrSlider.mouseMoved(() => {
		select('#learning-rate-value').html(` ${lrSlider.value()}`);
	});
	hnSlider.mouseMoved(() => {
		select('#hidden-nodes-value').html(` ${hnSlider.value()}`);
	});
	reset = select('#reset');
	reset.mousePressed(() => n = new NeuralNetwork(2, hnSlider.value(), 1, lrSlider.value()));
}	

function draw() {
	background(0);

	for (let i=0; i<100; i++) {
		let data = random(trainingData);
		n.train(data.inputs, data.targets);
	}
	const resolution = rSlider.value();
	const nCols = width / resolution;
	const nRows = height / resolution;

	noStroke();

	for (let i = 0; i < nCols; i++) {
		for (let j = 0; j < nRows; j++) {
			const y = n.predict([i/nCols, j/nRows]);
			fill(255*y);
			rect(i*resolution, j*resolution, resolution, resolution);
		}
	}
}