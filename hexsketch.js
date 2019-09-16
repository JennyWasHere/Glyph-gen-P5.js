function setup() {
	//Controls the size of the glyphs
	size = 20
	hexWidth = 2 * size
	hexHeight = Math.sqrt(3) * size
	spacing = 60
	verticalSpacing = hexHeight + spacing
	horizontalSpacing = hexWidth * (3 / 4) + spacing
	percentage = 0.5
	dotPercentage = 0.3
	//Thickness of the lines
	thickness = 4
	//Line color and transparency
	clr = color(206, 172, 65, 255)

	canvasSize = windowWidth
	frameRate(60)
	createCanvas(canvasSize, canvasSize)
	background(18)
	// put setup code here
	m = horizontalSpacing / 2
	n = verticalSpacing / 2
	offset = 0
}
class hexPoint {
	constructor(_x, _y) {
		this.x = _x
		this.y = _y
	}
	drawPoint() {
		stroke('#ff0000')
		strokeWeight(thickness*2)
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
	drawHexPoints() {
		for (let i = 0; i < this.points.length; i++) {
			if (Math.random() < dotPercentage) { this.points[i].drawPoint() }
		}
	}
	glyph() {
		let arr = []
		let len = this.points.length
		stroke(clr)
		strokeWeight(thickness)
		for (let i = 0; i < 12; i++) {
			arr.push(Math.random() < percentage)
		}
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
		stroke(clr)
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
	h = new Hex(m, n)
	h.drawHexPoints()
	h.glyph()
	if (!offset) {
		if (m < canvasSize - (3 * horizontalSpacing)) {
			m += horizontalSpacing * 2
		} else if (n < canvasSize - verticalSpacing) {
			// noLoop()
			n += verticalSpacing / 2
			m = 1.5 * horizontalSpacing
			offset++
		} else {
			noLoop()
		}
	} else {
		if (m < canvasSize - (3 * horizontalSpacing)) {
			m += horizontalSpacing * 2
		} else if (n < canvasSize - verticalSpacing) {
			// noLoop()
			n += verticalSpacing / 2
			m = horizontalSpacing / 2
			offset--
		} else {
			noLoop()
		}
	}
}
