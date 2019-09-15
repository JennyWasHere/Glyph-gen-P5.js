function setup() {
	offset = 10
	screenSize = 800
	percentage = 0.65
	size = 3
	strokeS = 4
	clr = [206, 172, 65, 255]
	
	createCanvas(screenSize,screenSize)
	m = offset
	n = offset
	background(18)

	 	// put setup code here
}
function lr(x,y) {
	strokeWeight(strokeS)
	stroke(...clr)
	line(x,y,x+offset,y)
}
function ld(x,y) {
	strokeWeight(strokeS)
	stroke(...clr)
	line(x,y,x,y+offset)
}

function patternCheck(a,b){
	swO = [[0,1,1],[1,1,1],[1,1,0]]
	swT = [[1,1,0],[1,1,1],[0,1,1]]
	blank = [[0,0,0],[0,0,0],[0,0,0]]
	if (
		(mEqual(a, swO) && mEqual(b, swT)) || 
		(mEqual(a, swT) && mEqual(b, swO)) || 
		(mEqual(a, blank) && mEqual(b, blank))
	) {
		a = scramble()
		b = scramble()
		patternCheck(a,b)
	}
	return [a,b]
}
function scramble() {
	a = []
	for (i = 0; i < size; i++){
		b = []
		for(j = 0; j < size; j++){
			b.push(Math.random()<=percentage ? 1 : 0)
		}
		a.push(b)
	}
	return a
}
function printM(arr){
	for (i=0; i<size; i++) {
		console.log(a[i])
	}
}
function mEqual(a,b){
	for (i=0; i<size; i++){
		for(j=0;j<size;j++){
			if (a[i][j]!=b[i][j]){
				return false
			}
		}
	}
	return true
}
function glyph(x,y){

	vs = scramble()
	hs = scramble()
	
	if (size == 3) {
		check = patternCheck(vs,hs)
		vs = check[0]
		hs = check[1]
	}
	
	for (i = 0; i<size; i++) {
		for (j = 0; j<size; j++) {
			if(j!=2){
				if(hs[i][j] && hs[i][j+1]){
					lr(x+(offset*j),y+(offset*i))
				}
			}
			
			if(i!=2){
				if(vs[i][j] && vs[i+1][j]){
					ld(x+(offset*j),y+(offset*i))					
				}
			}
		}
	}
	//noLoop()
}
function draw() {
	glyph(m,n)
	if (m < screenSize) {
		m += offset*(size+1)
	} else if (n < screenSize) {
		m = offset
		n += offset*(size+1)
		//noLoop()
	} else {
		m = offset
		n = offset
		noLoop()
	}
}