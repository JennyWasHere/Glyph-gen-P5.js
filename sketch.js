function setup() {
	//Controls the size of the glyphs
	lineSize = 10
	//Controls how many nodes each glyphs has
	nodes = 3
	/*
	Controls space between glyphs, 
	The formula at times 1 will make the spacing the same as between lines inside a glyph
	Golden ratio cause why not
	*/
	spacing = 1.618*(lineSize * nodes)/(nodes + 1)
	//Chance for a line to spawn
	percentage = Math.sqrt(1 / nodes)
	//Thickness of the lines
	thickness = 5
	//Line color and transparency
	clr = color(206, 172, 65, 255)
	//Starting position for the draw loop
	m = spacing
	n = spacing
	canvasSize = windowWidth
	frameRate(60)
	createCanvas(canvasSize, canvasSize)
	background(18)
	// put setup code here
}
//Draw a line to the right, at [x,y], lineSize long
function lr(x, y) {
	strokeWeight(thickness)
	stroke(clr)
	line(x, y, x + lineSize, y)
}
//Draw a line down, at [x,y], lineSize long
function ld(x, y) {
	strokeWeight(thickness)
	stroke(clr)
	line(x, y, x, y + lineSize)
}
//Recursive pattern checker
function patternCheck(a, b) {
	swOne = [[0, 1, 1], [1, 1, 1], [1, 1, 0]]
	swTwo = [[1, 1, 0], [1, 1, 1], [0, 1, 1]]
	if (
		(mEqual(a, swOne) && mEqual(b, swTwo)) ||
		(mEqual(a, swTwo) && mEqual(b, swOne))
	) {
		a = scramble(nodes, percentage)
		b = scramble(nodes, percentage)
		return patternCheck(a, b)
	}
	return [a, b]
}

//create a matrix of a given size, with a given random distribution of 1s and 0s
function scramble(x, chance) {
	a = []
	for (i = 0; i < x; i++) {
		b = []
		for (j = 0; j < x; j++) {
			b.push(Math.random() <= chance ? 1 : 0)
		}
		a.push(b)
	}
	return a
}

//print a matrix
function printM(arr) {
	for (i = 0; i < arr.length; i++) {
		console.log(arr[i])
	}
}

//check if two matrices are equal
function mEqual(a, b) {
	for (i = 0; i < nodes; i++) {
		for (j = 0; j < nodes; j++) {
			if (a[i][j] != b[i][j]) {
				return false
			}
		}
	}
	return true
}

function glyph(x, y) {

	vs = scramble(nodes, percentage)
	hs = scramble(nodes, percentage)

	//check for patterns you dont want, mainly swastikas
	if (nodes == 3) {
		check = patternCheck(vs, hs)
		vs = check[0]
		hs = check[1]
	}
	lines = 0
	//glyph drawing loop
	for (i = 0; i < nodes; i++) {
		for (j = 0; j < nodes; j++) {
			if (j != nodes - 1) {
				//checks adjacent horizontal nodes to see if both are truthy
				if (hs[i][j] && hs[i][j + 1]) {
					lr(x + (lineSize * j), y + (lineSize * i))
					lines++
				}
			}

			if (i != nodes - 1) {
				//checks adjacent vertical nodes to see if both are truthy
				if (vs[i][j] && vs[i + 1][j]) {
					ld(x + (lineSize * j), y + (lineSize * i))
					lines++
				}
			}
		}
	}
	//if nothing or only 1 line was drawn, try again
	if (lines <= 1) {
		glyph(x, y)
	}
	//noLoop()
}

function draw() {
	glyph(m, n)
	//magic numbers yay
	edgeOffset = 1.5 * (spacing * (nodes + 1))
	if (m + edgeOffset < canvasSize) {
		m += spacing * (nodes + 1)
	} else if (n + edgeOffset < canvasSize) {
		m = spacing
		n += spacing * (nodes + 1)
		//noLoop()
	} else {
		m = spacing
		n = spacing
		noLoop()
	}
}
