// * Bubbles ================================
(() => {
	const config = {
		dotsQuantity: 30,
		dotMinRad: 1,
		dotMaxRad: 20,
		sphereRad: 300,
		bigDotRad: 35,
		mouseSize: 120,
		massFactor: 0.003,
		firstMouseColor: "rgba(256, 0, 0, 0.3)",
		secondMouseColor: "rgba(256, 256, 256, 0.6)",
		firstColor: "rgba(256, 256, 256, 0.1)",
		secondColor: "rgba(256, 256, 256, 0.4)",
		smooth: 0.85,
	}
	const TWO_PI = 2 * Math.PI;
	const ctx = canvas.getContext(`2d`);
	let mouse, dots;
	class Dot {
		constructor(r) {
			this.pos = { x: mouse.x, y: mouse.y }
			this.vel = { x: 0, y: 0 }
			this.rad = r || random(config.dotMinRad, config.dotMaxRad);
			this.mass = this.rad * config.massFactor;
			this.color = config.defColor;
		}
		drawMouse(x, y) {
			this.pos.x = x || this.pos.x + this.vel.x;
			this.pos.y = y || this.pos.y + this.vel.y;
			createCircle(this.pos.x, this.pos.y, this.rad, true, config.firstMouseColor);
			createCircle(this.pos.x, this.pos.y, this.rad, false, config.secondMouseColor);
		}
		draw(x, y) {
			this.pos.x = x || this.pos.x + this.vel.x;
			this.pos.y = y || this.pos.y + this.vel.y;
			createCircle(this.pos.x, this.pos.y, this.rad, true, config.firstColor);
			createCircle(this.pos.x, this.pos.y, this.rad, false, config.secondColor);
		}
	}
	function updateDots() {
		for (let i = 1; i < dots.length; i++) {
			let acc = { x: 0, y: 0 }
			for (let j = 0; j < dots.length; j++) {
				if (i == j) continue;
				let [a, b] = [dots[i], dots[j]];
				let delta = { x: b.pos.x - a.pos.x, y: b.pos.y - a.pos.y }
				let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y) || 1;
				let force = (dist - config.sphereRad) / dist * b.mass;
				if (j == 0) {
					let alpha = config.mouseSize / dist;
					a.color = `rgba(250, 10, 30, ${alpha})`;
					dist < config.mouseSize ? force = (dist - config.mouseSize) * b.mass : force = a.mass;
				}
				acc.x += delta.x * force;
				acc.y += delta.y * force;
			}
			dots[i].vel.x = dots[i].vel.x * config.smooth + acc.x * dots[i].mass;
			dots[i].vel.y = dots[i].vel.y * config.smooth + acc.y * dots[i].mass;
		}
		dots.map(e => e == dots[0] ? e.drawMouse(mouse.x, mouse.y) : e.draw());
	}
	function createCircle(x, y, rad, fill, color) {
		ctx.fillStyle = ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.arc(x, y, rad, 0, TWO_PI);
		ctx.closePath();
		fill ? ctx.fill() : ctx.stroke();
	}
	function random(min, max) {
		return Math.random() * (max - min) + min;
	}
	function init() {
		w = canvas.width = maxSize * 1;
		h = canvas.height = maxSize * 1;
		mouse = { x: w / 2, y: h / 2, down: false }
		dots = [];
		dots.push(new Dot(config.bigDotRad));
	}
	function loop() {
		ctx.clearRect(0, 0, w, h);
		if (dots.length < config.dotsQuantity) { dots.push(new Dot()); }
		updateDots();
		window.requestAnimationFrame(loop);
	}
	init();
	loop();
	function setPos(event) {
		[mouse.x, mouse.y] = [event.clientX, event.clientY];
	}
	document.addEventListener(`mousemove`, setPos);
	document.addEventListener(`mousedown`, () => config.sphereRad = 100);
	document.addEventListener(`mouseup`, () => config.sphereRad = 300);

	// setInterval(() => {
	// 	config.sphereRad = Math.random() * (350-150) + 150
	// }, 3000);
	// setInterval(() => {
	// 	config.sphereRad = Math.random() * (950-550) + 550
	// }, 15001);
})();