/* Block level Scope */
var v3 = 'var';
{
	var v3 = 'var2';
	console.log(v3); // var2
}
console.log(v3); // var2

let l3 = 'let';
{
	let l3 = 'let2';
	console.log(l3); // let2
}
console.log(l3) // let

const c3 = 'const';
{
	const c3 = 'const2';
	console.log(c3); // const2
}
console.log(c3); // const