'use strict';
let n;
let slider;
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

	slider = select('#slider');
	n = new NeuralNetwork(2, 3, 1, slider.value());
	
	slider.mouseMoved(() => {
		select('#slider-value').html(` ${slider.value()}`);
	});
	reset = select('#reset');
	reset.mousePressed(() => n = new NeuralNetwork(2,3,1, slider.value()));
}	

function draw() {
	background(0);

	for (let i=0; i<100; i++) {
		let data = random(trainingData);
		n.train(data.inputs, data.targets);
	}
	
	const resolution = 5;
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