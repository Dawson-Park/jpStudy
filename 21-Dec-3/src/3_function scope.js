function varTest1() {
	var v1 = 1;
	console.log("varTest1", v1);
};
function varTest2() {
	console.log("varTest2", v1); // Uncaught ReferenceError: v1 is not defined
};
varTest1()
varTest2()

function letTest1() {
	let l1 = 1;
	console.log("letTest1", l1);
}
function letTest2() {
	console.log("letTest2", l1); // Uncaught ReferenceError: l1 is not defined
}
letTest1()
letTest2()

function constTest1() {
	const c1 = 1;
	console.log("constTest1", c1);
}
function constTest2() {
	console.log("constTest1", c1); // Uncaught ReferenceError: c1 is not defined
}
constTest1()
constTest2()