// ! ============ VIEW ============================
let maxSize, minSize

document.addEventListener("resize", Resize, false)
function Resize() {
	if (window.innerWidth < window.innerHeight) {
		maxSize = window.innerHeight
		minSize = window.innerWidth
	} 
	else {
		maxSize = window.innerWidth
		minSize = window.innerHeight
	}
	canvas.width	= maxSize * 2
	canvas.height	= maxSize * 2
}
Resize();