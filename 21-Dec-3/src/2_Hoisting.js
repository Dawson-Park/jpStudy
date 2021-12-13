/* Hoisting Test */
console.log(vName); // undefined
var vName = '1';

foo() // Uncaught TypeError: foo is not a function
var foo = _ => {
	console.log("bar");
}
foo()

console.log(lName); // Uncaught ReferenceError: lName is not defined
let lName = 'letName';

console.log(cName); // Uncaught ReferenceError: cName is not defined
const cName = 'constName';