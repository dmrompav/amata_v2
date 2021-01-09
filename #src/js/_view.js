// ! ============ VIEW ============================
let maxSize, minSize, w, h

window.addEventListener("resize", Resize, false)
function Resize() {
	if (window.innerWidth < window.innerHeight) {
		maxSize	= window.innerHeight
		minSize	= window.innerWidth
	} 
	else {
		maxSize = window.innerWidth
		minSize = window.innerHeight
	}
	w				= maxSize
	h				= maxSize
	canvas.width	= maxSize
	canvas.height	= maxSize
	if(minSize < 650) {
		li.forEach((e) => {
			e.classList.add('mobile')
		})
		liBut.forEach((e) => {
			e.classList.add('mobile')
		})
	}
	else {
		li.forEach((e) => {
			e.classList.remove('mobile')
		})
		liBut.forEach((e) => {
			e.classList.remove('mobile')
		})
	}
}
Resize();