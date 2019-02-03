'use strict';

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
	createCanvas(windowWidth, windowHeight);

	const n = new NeuralNetwork(2,2,1, 0.2);
	for (let i=0; i<50000; i++) {
		let data = random(trainingData);
		n.train(data.inputs, data.targets);
	}
	console.log(n.feedforward([0,1]));
	console.log(n.feedforward([1,0]));
	console.log(n.feedforward([0,0]));
	console.log(n.feedforward([1,1]));
}	

function draw() {

}