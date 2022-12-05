//@ts-check
/** @type {HTMLCanvasElement} */ //@ts-ignore canvas is an HTMLCanvasElement
const canvas = document.getElementById("game-canvas");
/** @type {CanvasRenderingContext2D} */ //@ts-ignore canvas is an HTMLCanvasElement
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;


let game = {
    gridSize: 20,
    refreshRate: 500,  




class  segment {
/**
	 * @param {number} x

	 * @param {number} y
	 * @param {CanvasRenderingContext2D} ctx;
	 */
 constructor(x, y) {
	constructor(x, y, ctx) {
		this.x = x;
		this.y = y;
		this.w = game.gridSize;
		this.h = this.w;
		this.segments = [];
		this.ctx = ctx;
		this.segments = [new Segment(this.x, this.y, "yellow", this.ctx)];
	}

	update() {}
	draw() {
		this.segments.forEach((s) => {
			s.draw();
		});
	}
}
//
@@ -30,16 +39,40 @@ class Segment {
	 * @param {number} x
	 * @param {number} y
	 * @param {string} color
	 * @param {CanvasRenderingContext2D} ctx
	 */
	constructor(x, y, color) {
	constructor(x, y, color, ctx) {
		this.x = x;
		this.y = y;
		this.w = game.gridSize;
		this.h = this.w;
		this.color = color;
		this.ctx = ctx;
	}

	update() {}

	draw() {
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(this.x, this.y, this.w, this.h);
	}
}

let p1 = new Player(
    5 * game.gridSize,
    5 * game.gridSize,
    ctx);

let currentTime = 0;

function gameLoop(timestamp) {
	let elapsedTime = timestamp - currentTime;
	currentTime = timestamp;
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	p1.draw();

	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop)

  46  
scripts/app.js
@@ -16,18 +16,48 @@ class Player {
	 * @param {number} x
	 * @param {number} y
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {game} game
	 */
	constructor(x, y, ctx) {
	constructor(x, y, ctx, game) {
		this.x = x;
		this.y = y;
		this.w = game.gridSize;
		this.h = this.w;
		this.game = game;
		this.ctx = ctx;
		this.segments = [new Segment(this.x, this.y, "yellow", this.ctx)];

		this.currentDirection = "right";
		this.head = new Segment(this.x, this.y, "yellow", this.ctx);
		this.segments = [];

		this.lastUpdate = 0;
	}

	/**
	 * @param {number} elapsedTime
	 */
	update(elapsedTime) {
		this.lastUpdate += elapsedTime;
		if (this.lastUpdate < this.game.refreshRate) return;

		this.lastUpdate = 0;

		switch (this.currentDirection) {
			case "down":
				this.head.y += this.game.gridSize;
				break;
			case "up":
				this.head.y -= this.game.gridSize;
				break;
			case "right":
				this.head.x += this.game.gridSize;
				break;
			case "left":
				this.head.x -= this.game.gridSize;
				break;
		}
	}

	update() {}
	draw() {
		this.head.draw();
		this.segments.forEach((s) => {
			s.draw();
		});
@@ -58,10 +88,7 @@ class Segment {
	}
}

let p1 = new Player(
    5 * game.gridSize,
    5 * game.gridSize,
    ctx);
let p1 = new Player(5 * game.gridSize, 5 * game.gridSize, ctx, game);

let currentTime = 0;

@@ -70,6 +97,7 @@ function gameLoop(timestamp) {
	currentTime = timestamp;
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	p1.update(elapsedTime);
	p1.draw();

	// @ts-ignore
	requestAnimationFrame(gameLoop);