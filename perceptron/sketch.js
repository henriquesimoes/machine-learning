let trainingData;
let perceptron;
let data = [];

function f(x) {
	return 0.5 * x + 0.1;
}

function setup() {
	createCanvas(500, 500);
	createTrainingData();
	frameRate(1);
	perceptron = new Perceptron(3);
}

function draw() {
	background(255);
	const p1 = new Point(-1, f(-1));
	const p2 = new Point(1, f(1));
	drawLine(p1, p2);
	drawTrainingLine();

	trainingData.forEach((point) => point.show());
	data.forEach((point) => point.show());
	
	train();

	trainingData.forEach((point) => {
		const guess = perceptron.guess([point.x, point.y, point.bias]);
	
		if (guess == point.label) {
			fill(0, 255, 0);
		} else {
			fill(255, 0, 0);
		}
		ellipse(point.pixelX, point.pixelY, 8);
	});
}

function createTrainingData () {
	trainingData = [];
	for (let i = 0; i < 100; i++) {
		trainingData.push(new Point);		
	}
}

function mouseClicked() {
	const point = new Point;
	point.pixelX = mouseX;
	point.pixelY = mouseY;
	data.push(point);
	
	point.label = perceptron.guess([point.x, point.y, point.bias]);
	point.show();
}

function train () {
	trainingData.forEach((pt) => {
		perceptron.train([pt.x, pt.y, pt.bias], pt.label);
	});
}

function drawTrainingLine () {
	const p1 = new Point(-1, perceptron.guessY(-1));
	const p2 = new Point(1, perceptron.guessY(1));
	drawLine(p1, p2);
	
}

function drawLine(p1, p2) {
	line(p1.pixelX, p1.pixelY, p2.pixelX, p2.pixelY);
}