/*
	* app.js : Contains the set of codes which will create balls and play inside the box
	* Created Date : 25-05-2016 (dd-mm-yyyy)
	* Created By : Subrat kumar Sarangi
*/

var canvas = document.getElementById("stageCanvas"),
context = canvas.getContext('2d'),
cw = canvas.width,
ch = canvas.height,
frameRate = 60,
frameTimer = 1000 / frameRate,
speed = 1,
paused = false,
balls = [],
speedSpan = document.getElementById('speedValueSpan');

// RequestAnimFrame: a browser API for getting smooth animations
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       || 
		window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame    || 
		window.oRequestAnimationFrame      || 
		window.msRequestAnimationFrame     ||  
		function( callback ){
			return window.setTimeout(callback, frameTimer);
		};
})();

//To define ball Class
function Ball(pX,pY) {
	this.x = pX;
	this.y = pY;
	this.radius = 20;
	this.target = {x:4,y:-4};
	this.ballColor = "#" + Math.random().toString(16).slice(2, 8).toUpperCase();
}

//To Create ball
function create() {
	context.clearRect(0, 0, cw, ch);
	for(var i = 0; i < balls.length; i++) {
		var ball = balls[i];
		context.beginPath();
		context.fillStyle = ball.ballColor;
		context.arc(ball.x,ball.y,ball.radius,0,Math.PI*2);
		context.fill();
	}
}

//To move and bounce ball
function animate() {
	for(var i = 0; i < balls.length; i++) {
		var ball = balls[i];
		if(ball.x + ball.target.x > cw - ball.radius || ball.x + ball.target.x < ball.radius) {
	        ball.target.x = -ball.target.x;
	    }
	    if(ball.y + ball.target.y > ch - ball.radius || ball.y + ball.target.y < ball.radius) {
	        ball.target.y = -ball.target.y;
	    }
	    
	    ball.x += (ball.target.x * speed);
	    ball.y += (ball.target.y * speed);	        
	}
    create();
    if(!paused)
    	requestAnimationFrame(animate);
}

//On canvas mouseDown
canvas.onmousedown = function(e) {
	var x = e.clientX - canvas.getBoundingClientRect().left;
	var y = e.clientY - canvas.getBoundingClientRect().top;
	var ball = new Ball(x,y);
	balls.push(ball);
	animate();
}

//On Resume button click
function play() {
	paused = false;
	animate();
}

//On pause button click
function pause() {
	paused = true;
}

//On speed range slider move
function updateSpeed(val) {
	speedSpan.innerHTML = val;
	speed = val;
	animate();
}

//On body load
function init() {
	document.getElementById("speedRange").value = speed;
	speedSpan.innerHTML = speed;
}