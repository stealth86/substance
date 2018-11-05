/* not bound to style, should be computed */

export function computeInOffsetByIndex(x,y,index) {
	let outx = x + 15;
	let outy = y + 44 + (index * 14.5);

	return {x:outx, y:outy};
}

export function computeOutOffsetByIndex(x,y,index) {

	let outx = x + 166;
	let outy = y + 45 + (index * 17.5);

	return {x:outx, y:outy};

}