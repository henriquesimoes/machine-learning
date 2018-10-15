let m = 1;
let b = 0;

let learningRate = 0.05;

const data = [];

function setup() {
	createCanvas(500, 500);
}

function draw() {
	background(51);
	stroke(255);
	fill(255);
	data.forEach((point) => {
		const x = map(point.x, 0, 1, 0, width);
		const y = map(point.y, 1, 0, 0, height);

		ellipse(x, y, 8);
	});

	if (data.length > 1) {
		gradientDescent();
		drawLine();
	}
}

function mousePressed() {
	const x = map(mouseX, 0, width, 0, 1);
	const y = map(mouseY, 0, height, 1, 0);

	const point = createVector(x, y);
	data.push(point);
}

function drawLine() {
	let x1 = 0;
	let y1 = m * x1 + b;
	let x2 = 1;
	let y2 = m * x2 + b;

	x1 = map(x1, 0, 1, 0, width);
	y1 = map(y1, 1, 0, 0, height);
	x2 = map(x2, 0, 1, 0, width);
	y2 = map(y2, 1, 0, 0, height);

	stroke(255, 0, 0);
	line(x1, y1, x2, y2);
}

function gradientDescent() {
	data.forEach((point) => {
		const x = point.x;
		const y = point.y;
		
		const guess = m * x + b;
		const error = y - guess;

		m += (error * x) * learningRate;
		b += error * learningRate;
	});
}
