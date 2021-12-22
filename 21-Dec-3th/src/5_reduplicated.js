/* Reduplicated Declare Test */
(function varReduplicate() {
	var v2 = 0;
	console.log(v2); // 0

	var v2 = 1;
	console.log(v2); // 1
})();

(function letReduplicate() {
	let l2 = 0;
	console.log(l2);

	let l2 = 1; // Uncaught SyntaxError: Identifier 'l2' has already been declared
	console.log(l2);
})();

(function constReduplicate() {
	const c2 = 0;
	console.log(c2);

	const c2 = 1; // Uncaught SyntaxError: Identifier 'c2' has already been declared
	console.log()
})();