/* this binding */
var var1 = 0; // this.var1
function fooVar1() {
	var var1 = 1;
	console.log(var1); // 1
	console.log(this.var1); // 0
	console.log(var1 === this.var1) // false
}
console.log(window.var1); // 0
fooVar1()
console.log(var1 === this.var1) // true

'use strict'
let let1 = 0;
function fooLet1() {
	let let1 = 1;
	console.log(let1) // 1
	console.log(this.let1); // undefined
}
console.log(window.let1); // undefined
fooLet1()
console.log(let1 === this.let1) // false

let let2 = 0;
let fooLet2 = _ => {
	let let2 = 1;
	console.log(let2);
	console.log(this.let2); // undefined
}
fooLet2()
console.log(this.let2); // undefined

this.x = 0;
let fooLet3 = _ => {
	let x = 1;
	console.log(this.x); // 0
}
fooLet3()
console.log(this.x); // undefined

const c = 0;
function fooConst() {
	const c = 1;
	console.log(this.c); // undefined
}
fooConst()
console.log(this.c); // undefined