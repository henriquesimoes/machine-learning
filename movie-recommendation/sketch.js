let data;

let dropdowns = [];
let dropdown1;
let dropdown2;
let topDropdown;
let ratings;
let movies;

let simResultP;
let topResultP;
let predictionResultDiv;

let topButton;
let simButton;
let predictRatingButton;

function preload () {
	data = loadJSON('ratings.json');
}

function setup () {
	noCanvas();
	ratings = data.ratings;
	movies = data.movies;

	createSimilaritiesInterface();

	simButton.mousePressed(() => {
		simResultP.html('Similarity: '
			+ euclidean(
					ratings[dropdown1.value()], 
					ratings[dropdown2.value()]
				));
	});

	createTopSimilaritiesInterface();

	topButton.mousePressed(() => {
		const result = findNearestNeighbors(topDropdown.value());
		printTop5(result, topResultP);
	});
	
	createNewUserInterface();

	predictRatingButton.mousePressed(() => {
		const user = {};
		dropdowns.forEach((dd) => {
			user[dd.title] = dd.value() === 'not seen' ? null : dd.value();
		});
		const result = findNearestNeighbors(user);
		let text = '';
		movies.forEach((movie) => {
			if (user[movie] === null) {
				let score = 0;
				let k = 5;
				let similaritySum = 0;
				result.forEach((r) => {
					if (k-- >= 0) {
						neighborScore = ratings[r.name][movie] ? parseFloat(ratings[r.name][movie]) * r.score : 0;
						score += neighborScore;
						similaritySum += r.score;
					}
				});
				score /= similaritySum;
				text += `<p>${movie}: ${score}</p>`;
			}
		});
		predictionResultDiv.html(text);
	});

	Object.keys(ratings).forEach((name) => {
		dropdown1.option(name);
		dropdown2.option(name);
		topDropdown.option(name);
	});
}

function euclidean (ratings1, ratings2) {
	let sum = 0;
	movies.forEach(movie => {
		if (ratings1[movie] && ratings2[movie]) {
			sum += pow(ratings1[movie] - ratings2[movie], 2);
		}
	});

	let d = sqrt(sum);
	return 1 / (1 + d);
}

function findNearestNeighbors (target) {
	if (typeof target === 'string') {
		target = ratings[target];
	}

	let result = [];
	for (rating in ratings) {		
		if (ratings[rating] !== target) {
			result.push({
				name: rating,
				score: euclidean(target, ratings[rating])
			});
		}
	}
	result.sort((a, b) => {
		return b.score - a.score;
	});
	return result;
}

function createSimilaritiesInterface () {
	dropdown1 = createSelect().parent('#two-similarities');
	dropdown2 = createSelect().parent('#two-similarities');
	simButton = createButton('Check similarity').parent('#two-similarities');
	simResultP = createP('').parent('#two-similarities');
}

function createTopSimilaritiesInterface () {
	topDropdown = createSelect().parent('#top-similarities');
	topButton = createButton('Find top 5').parent('#top-similarities');
	topResultP = createP('').parent('#top-similarities');
}

function createNewUserInterface () {
	movies.forEach((movie) => {
		let div = createDiv(movie).parent('#predict');
		let dropdown = createSelect().parent(div);
		dropdown.option('not seen');
		dropdown.title = movie;
		for(let i = 1; i< 6; i++) {
			dropdown.option(i);
		}
		dropdowns.push(dropdown);
	});
	predictRatingButton = createButton('Predict ratings').parent('#predict');
	predictionResultDiv = createP('').parent('#predict');
}

function printTop5 (result, resultP) {
	let resultText = '';
	let i = 0;
	for (r of result) {
		if (i++ == 5) break;
		resultText += `<li>${r.name}</li>`;
	}
	resultP.html(`<ol>${resultText}</ol>`);
}
