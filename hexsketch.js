function setup() {
	//Controls the size of the glyphs
	size = 20
	hexWidth = 2 * size
	hexHeight = Math.sqrt(3) * size
	spacing = 40
	verticalSpacing = hexHeight + spacing
	horizontalSpacing = hexWidth * (3 / 4) + spacing
	percentage = 0.5
	dotPercentage = 0.2
	//Thickness of the lines
	thickness = 4
	//Line color and transparency
	// clr = color(206, 172, 65, 255)

	canvasSize = 500
	frameRate(60)
	createCanvas(canvasSize, canvasSize)
	background(18)
	// put setup code here
	m = horizontalSpacing / 2
	n = verticalSpacing / 2
	offset = 0


	//Sliders
	redrawButton = createButton('Redraw')
	redrawButton.position(canvasSize - 80, canvasSize + 20)
	redrawButton.mousePressed(redrawHex)
	rSlider = createSlider(0, 255, 206);
	rSlider.position(20, canvasSize + 20);
	gSlider = createSlider(0, 255, 172);
	gSlider.position(20, canvasSize + 50);
	bSlider = createSlider(0, 255, 65);
	bSlider.position(20, canvasSize + 80);
	sizeSlider = createSlider(10, 100, size);
	sizeSlider.position(20, canvasSize + 100);
	spacingSlider = createSlider(0, 10, spacing);
	spacingSlider.position(20, canvasSize + 120);
}
function redrawHex() {
	clear()
	background(18)
	loop()
}
class hexPoint {
	constructor(_x, _y) {
		this.x = _x
		this.y = _y
	}
	drawPoint(clr) {
		stroke(clr)
		strokeWeight(thickness * 3)
		line(this.x, this.y, this.x, this.y)
	}
}
function flat_hex_corner(center, size, i) {
	angle_deg = 60 * i
	angle_rad = Math.PI / 180 * angle_deg
	return new hexPoint(center.x + size * Math.cos(angle_rad), center.y + size * Math.sin(angle_rad))
}

function middle(x, y) {
	return (3 * x + y) / 4
}
function randLines() {
	arr = []
	for (let i = 0; i < 12; i++) {
		arr.push(Math.random() < percentage)
	}
	if (JSON.stringify(arr) == '[1,0,0,1,0,0,1,0,1,1,0,1]') {
		return randLines()
	}
	return arr;
}
class Hex {

	points = [];

	constructor(_x, _y) {
		let center = new hexPoint(_x, _y)
		this.points.push(center)
		for (let i = 0; i < 6; i++) {
			this.points.push(flat_hex_corner(center, size, i))
			this.x = _x
			this.y = _y
		}
	}
	drawHexPoints(clr) {
		for (let i = 0; i < this.points.length; i++) {
			if (Math.random() < dotPercentage) { this.points[i].drawPoint(clr) }
		}
	}
	glyph(clr) {
		let arr = randLines()
		let len = this.points.length
		stroke(clr)
		strokeWeight(thickness)
		for (let i = 1; i < len; i++) {
			let next = i + 1 != len ? i + 1 : 1
			let x = this.points[i].x
			let y = this.points[i].y
			let j = this.points[next].x
			let k = this.points[next].y
			if (arr[i - 1]) {
				// line(middle(x, j), middle(y, k), middle(j, x), middle(k, y))
				line(x, y, j, k)
			}
		}
		for (let i = 1; i < len; i++) {
			let x = this.points[0].x
			let y = this.points[0].y
			let j = this.points[i].x
			let k = this.points[i].y
			if (arr[i + 5]) {
				// line(middle(x, j), middle(y, k), middle(j, x), middle(k, y))
				line(x, y, j, k)
			}
		}
	}
	drawHex() {
		let len = this.points.length
		// stroke(clr)
		strokeWeight(thickness)
		for (let i = 1; i < len; i++) {
			let next = i + 1 != len ? i + 1 : 1
			let x = this.points[i].x
			let y = this.points[i].y
			let j = this.points[next].x
			let k = this.points[next].y
			line(middle(x, j), middle(y, k), middle(j, x), middle(k, y))
		}
	}

}

function draw() {
	const r = rSlider.value()
	const g = gSlider.value()
	const b = bSlider.value()
	size = sizeSlider.value()
	hexWidth = 2 * size
	hexHeight = Math.sqrt(3) * size
	spacing = spacingSlider.value() * size
	verticalSpacing = hexHeight + spacing
	horizontalSpacing = hexWidth * (3 / 4) + spacing
	lineColor = color(r, g, b, 255)
	dotColor = color(255, 0, 0, 255)
	h = new Hex(m, n)
	h.drawHexPoints(dotColor)
	h.glyph(lineColor)
	if (!offset) {
		if (m < canvasSize - (2.5 * horizontalSpacing)) {
			m += horizontalSpacing * 2
		} else if (n < canvasSize - verticalSpacing) {
			// noLoop()
			n += verticalSpacing / 2
			m = 1.5 * horizontalSpacing
			offset++
		} else {
			m = horizontalSpacing / 2
			n = verticalSpacing / 2
			noLoop()
			offset = 0
		}
	} else {
		if (m < canvasSize - (2.5 * horizontalSpacing)) {
			m += horizontalSpacing * 2
		} else if (n < canvasSize - verticalSpacing) {
			// noLoop()
			n += verticalSpacing / 2
			m = horizontalSpacing / 2
			offset--
		} else {
			m = horizontalSpacing / 2
			n = verticalSpacing / 2
			noLoop()
			offset = 0
		}
	}
}
