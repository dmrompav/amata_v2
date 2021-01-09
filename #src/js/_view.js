// ! ============ VIEW ============================
let maxSize, minSize

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