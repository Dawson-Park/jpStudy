var testFunction = _ => {
	console.log("1")
}
function testFunction() {
	console.log("2");
}
testFunction() // 1

let testFunction2 = _ => {
	console.log("1")
}
function testFunction2 () {
	console.log("2")
} // Uncaught SyntaxError: Identifier 'testFunction2' has already been declared
testFunction2();