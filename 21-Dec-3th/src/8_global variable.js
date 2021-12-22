/* 암묵적인 전역변수 */
var x = 0;
function a() {
	var y = 1;

	console.log(x, y); // 0 1

	function b() {
		x = 3;
		y = 4;
		z = 5;
	}
	b();

	console.log(x, y, z); // 3 4 5
}

a();
console.log(x, z); // 3 5
console.log(typeof y) // undefined