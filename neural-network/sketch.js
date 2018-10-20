function setup() {
	createCanvas(windowWidth, windowHeight);
	const m1 = new Matrix(2, 2).randomize();
	const m2 = new Matrix(2, 2).randomize();
	console.table(m1.values);
	console.table(m1.transpose().values);
	console.table(m2.values);
	console.table(m1.mult(m2).values);
}

function draw() {

}