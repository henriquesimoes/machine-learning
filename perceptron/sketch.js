let trainingData;
let perceptron;
let data = [];

function setup() {
	createCanvas(500, 500);
	createTrainingData();
	line(0, 0, width, height);
	frameRate(1);
	perceptron = new Perceptron;
}

function draw() {
	train();
	trainingData.forEach((point) => {
		let guess = perceptron.guess([point.x, point.y]);
	
		if (guess == point.label) {
			fill(0, 255, 0);
		} else {
			fill(255, 0, 0);
		}
		ellipse(point.x, point.y, 8);
	});
}

function createTrainingData () {
	trainingData = [];
	for (let i = 0; i < 100; i++) {
		trainingData.push(new Point);		
	}
	trainingData.forEach((point) => {
		point.show();
	});
}

function mouseClicked() {
	const point = new Point(mouseX, mouseY);
	data.push(point);
	point.label = perceptron.guess([point.x, point.y]);
	point.show();
}

function train () {
	trainingData.forEach((pt) => {
		perceptron.train([pt.x, pt.y], pt.label);
	});
}