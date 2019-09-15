function setup() {
	offset = 7
	screenSize = 700
	percentage = 0.65
	size = 3
	strokeS = 4
	clr = [206, 172, 65, 255]

	createCanvas(screenSize, screenSize)
	m = offset
	n = offset
	background(18)

	// put setup code here
}
function lr(x, y) {
	strokeWeight(strokeS)
	stroke(...clr)
	line(x, y, x + offset, y)
}
function ld(x, y) {
	strokeWeight(strokeS)
	stroke(...clr)
	line(x, y, x, y + offset)
}

function patternCheck(a, b) {
	swOne = [[0, 1, 1], [1, 1, 1], [1, 1, 0]]
	swTwo = [[1, 1, 0], [1, 1, 1], [0, 1, 1]]
	if (
		(mEqual(a, swOne) && mEqual(b, swTwo)) ||
		(mEqual(a, swTwo) && mEqual(b, swOne))
	) {
		a = scramble()
		b = scramble()
		check = patternCheck(a, b)
		a = check[0]
		b = check[1]
	}
	return [a, b]
}
function scramble() {
	a = []
	for (i = 0; i < size; i++) {
		b = []
		for (j = 0; j < size; j++) {
			b.push(Math.random() <= percentage ? 1 : 0)
		}
		a.push(b)
	}
	return a
}
function printM(arr) {
	for (i = 0; i < size; i++) {
		console.log(arr[i])
	}
}
function mEqual(a, b) {
	for (i = 0; i < size; i++) {
		for (j = 0; j < size; j++) {
			if (a[i][j] != b[i][j]) {
				return false
			}
		}
	}
	return true
}
function glyph(x, y) {

	vs = scramble()
	hs = scramble()

	if (size == 3) {
		check = patternCheck(vs, hs)
		vs = check[0]
		hs = check[1]
	}
	lines = 0
	for (i = 0; i < size; i++) {
		for (j = 0; j < size; j++) {
			if (j != 2) {
				if (hs[i][j] && hs[i][j + 1]) {
					lr(x + (offset * j), y + (offset * i))
					lines ++
				}
			}

			if (i != 2) {
				if (vs[i][j] && vs[i + 1][j]) {
					ld(x + (offset * j), y + (offset * i))
					lines ++
				}
			}
		}
	}
	if (lines == 0) {
		glyph(x,y)
	}
	//noLoop()
}
function draw() {
	glyph(m, n)
	if (m < screenSize) {
		m += offset * (size + 1)
	} else if (n < screenSize) {
		m = offset
		n += offset * (size + 1)
		//noLoop()
	} else {
		m = offset
		n = offset
		noLoop()
	}
}