var variable = 0;
(function varTest() {
	var variable = 1;
	if(true) {
		var variable = 2;
		console.log("varTest", "in", variable); // varTest in 2
	}
	console.log("varTest", "out", variable); // varTest out 2
})();
console.log("varTest", "global", variable); // varTest global 0

let letX = 0;
(function letTest() {
	let letX = 1;
	if(true) {
		let letX = 2;
		console.log("letTest", "in", letX); // letTest in 2
	}
	console.log("letTest", "out", letX); // letTest out 1
})();
console.log("letTest", "global", letX); // letTest global 0

const constant = 0;
(function constTest() {
	const constant = 1;
	if(true) {
		const constant = 2;
		console.log("constTest", "in", constant); // constTest in 2
	}
	console.log("constTest", "out", constant); // constTest out 1
})();
console.log("constTest", "global", constant); // constTest global 0
