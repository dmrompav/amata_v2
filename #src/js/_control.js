// ! ================= CONTROL ===================================
// mouse move => menu rotate
document.addEventListener('mousemove', (e) => {
	let rotationX = - (e.clientX - window.innerWidth / 2) / window.innerWidth * 30 - 7,
		rotationY = (e.clientY - window.innerHeight / 2) / window.innerHeight * 30 + 7
	rotator.style.transform = 'rotateX(' + rotationY + 'deg) rotateY(' + rotationX + 'deg)'
}, false)

document.addEventListener('touchmove', (e) => {
	let rotationX = - (e.changedTouches[0].pageX - window.innerWidth / 2) / window.innerWidth * 30 - 7,
		rotationY = (e.changedTouches[0].pageY - window.innerHeight / 2) / window.innerHeight * 30 + 7
	rotator.style.transform = 'rotateX(' + rotationY + 'deg) rotateY(' + rotationX + 'deg)'
	console.log(e.changedTouches[0].pageX)
}, false);

// central button mouse hover
centrlBtn.addEventListener('mouseover', () => {butNames.classList.add('menu__names--hover')}, false)
centrlBtn.addEventListener('mouseout', () => {butNames.classList.remove('menu__names--hover')}, false)

// central button click => open nav + some animations
let isOpened = false
centrlBtn.addEventListener('click', centrlBtnClick, false)
but.addEventListener('click', centrlBtnClick, false)

// nav buttons click => open popup
let indexOfPopup
liBut.forEach((e) => {
	e.addEventListener('click', OpenPopUp, false)
})
tapfield.addEventListener('click', ClosePopUp, false)

// ------- functions -------------------
function centrlBtnClick() {
	if (!isOpened) {
		but.classList.add('menu__large-btn--opened')
		butNames.classList.add('menu__names--opened')
		butLogos.classList.add('menu__logos--opened')
		circles.classList.add('menu__circles--opened')
		nav.classList.add('menu__nav--opened')
		ul.classList.add('menu__ul--opened')
		li.forEach((e) => {e.classList.add('menu__li--opened')})
		liBut.forEach((e) => {e.classList.add('menu-li__button--opened')})

	} else {
		but.classList.remove('menu__large-btn--opened')
		butNames.classList.remove('menu__names--opened')
		butLogos.classList.remove('menu__logos--opened')
		circles.classList.remove('menu__circles--opened')
		nav.classList.remove('menu__nav--opened')
		ul.classList.remove('menu__ul--opened')
		li.forEach((e) => {e.classList.remove('menu__li--opened')})
		liBut.forEach((e) => {e.classList.remove('menu-li__button--opened')})
	}
	isOpened = !isOpened
}

function OpenPopUp() {
	liBut.forEach((e, i) => {
		if (e === this) {
			indexOfPopup = i
			menu.classList.add('menu--hidden')
			tapfield.classList.add('main__tapfield--opened')
			body.classList.add('body--popup-opened')
			popup[indexOfPopup].classList.add('main__popup--opened')
			let close = document.createElement('div')
			popup[indexOfPopup].prepend(close)
			close.classList.add('main__close')
			close.innerHTML = 'X'
			close.addEventListener('click', ClosePopUp, false)
			LazyPopup(indexOfPopup)
		}
	})
}

function LazyPopup(i) {
	let j = 0
	let lazyInterval = setInterval(() => {
		lazy[i][j].classList.add('popup__lazy--opened')
		j++
		if (j === lazy[i].length) {
			clearInterval(lazyInterval)
		}
	}, 100)
}

function ClosePopUp() {
	menu.classList.remove('menu--hidden')
	tapfield.classList.remove('main__tapfield--opened')
	body.classList.remove('body--popup-opened')
	popup[indexOfPopup].classList.remove('main__popup--opened')
	popup[indexOfPopup].querySelector('.main__close').remove()
	lazy[indexOfPopup].forEach((e) => {e.classList.remove('popup__lazy--opened')})
}