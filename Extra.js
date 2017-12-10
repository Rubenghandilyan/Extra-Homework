const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");

const rand = function(num) {
	return Math.floor(Math.random() * num) + 1;
}

canvas.width = 1200;
canvas.height = 600;
const player1 = 	
{
	x: 10,
	y: canvas.height/2 - 50,	
	width: 5,
	height: 100,
	pressedUpKey : false,
	pressedDownKey : false
}

const player2 = 	
{
	x: canvas.width - 15,
	y: canvas.height/2 - 50,	
	width: 5,
	height: 100,
	pressedUpKey : false,
	pressedDownKey : false
}

const ball = 	
{
	x: canvas.width/2 - 6,
	y: 12 + rand(canvas.height-24),	
	radius: 12,
	xDelta: 5,
	yDelta: 5,
}

const number = 	
{
	x: (canvas.width/2) - 125,
	y: 100,
	score1: 0,
	score2: 0	
}

if(rand(2) === 2)
{
	ball.xDelta = -ball.xDelta;
}
if(rand(2) === 2)
{
	ball.yDelta = -ball.yDelta;
}

const drawLine = function()
{
	context.beginPath();
	context.moveTo(canvas.width/2,0);
	context.lineTo(canvas.width/2,canvas.height);
	context.strokeStyle="rgba(0,0,0,0.2)";
	context.stroke();

}
context.beginPath();
context.arc(ball.x,ball.y,ball.radius,0,2*Math.PI);
context.fillStyle = "red";
context.fill();



const updateData = function()
{
	if(player1.pressedUpKey)
		if(player1.y>0)
			player1.y = player1.y - 5;
	if(player1.pressedDownKey)
		if(player1.y + player1.height < canvas.height)
			player1.y = player1.y + 5;		
	if(player2.pressedUpKey)
		if(player2.y>0)
			player2.y = player2.y - 5;
	if(player2.pressedDownKey)
		if(player2.y + player2.height < canvas.height)
		player2.y = player2.y + 5;

	if(ball.y + ball.radius >=canvas.height)
		ball.yDelta = -ball.yDelta;
	if(ball.y - ball.radius<=0)
		ball.yDelta = -ball.yDelta;
	ball.x = ball.x + ball.xDelta;
	ball.y = ball.y + ball.yDelta;

	if(((player1.x+player1.width+15>=ball.x) && (player1.x+player1.width+5<=ball.x)) && ((player1.y<=ball.y + ball.radius) && (player1.y + player1.height>=ball.y-ball.radius)))
	{
		ball.xDelta = -ball.xDelta;
		if(ball.xDelta>0)
			ball.xDelta = ball.xDelta + 0.5;
		else
			ball.xDelta=ball.xDelta - 0.5;
		if(ball.yDelta>0)
			ball.yDelta= ball.yDelta + 0.5;
		else
			ball.yDelta=ball.yDelta-0.5;
	}
	if(ball.x<=-250)
	{
		if(ball.xDelta>0)
			ball.xDelta = 5;
		else
			ball.xDelta = -5;
		number.score2++;
		ball.x = canvas.width/2 - 6;
		ball.y = 12 + rand(canvas.height-24);
		if(rand(2) === 2)
		{
			ball.yDelta = 5;
		}
		else
		{
			ball.yDelta = -5;
		}
	}

	if((player2.x-15<=ball.x) && (player2.x-5>=ball.x) && ((player2.y<=ball.y + ball.radius) && (player2.y + player2.height>=ball.y-ball.radius)))
	{
		ball.xDelta = -ball.xDelta;
		if(ball.xDelta>0)
			ball.xDelta = ball.xDelta + 0.5;
		else
			ball.xDelta=ball.xDelta - 0.5;
		if(ball.yDelta>0)
			ball.yDelta= ball.yDelta + 0.5;
		else
			ball.yDelta=ball.yDelta-0.5;
		
	}
	if(ball.x>=canvas.width+250)
	{	
		if(ball.xDelta>0)
			ball.xDelta = 5;
		else
			ball.xDelta = -5;
		number.score1++;
		ball.x = canvas.width/2 - 6;
		ball.y = 12 + rand(canvas.height-24);
		if(rand(2) === 2)
		{
			ball.yDelta = 5;
		}
		else
		{
			ball.yDelta = -5;
		}
	}
}


const draw = function()
{
	context.clearRect(0,0,canvas.width,canvas.height);
	context.fillStyle = "black";
	context.fillRect(player1.x,player1.y,player1.width,player1.height);
	context.fillRect(player2.x,player2.y,player2.width,player2.height);

	drawLine();

	
	context.font = "100px Arial";
	context.fillText("" + number.score1 + "",number.x,number.y);
	context.fillText("" + number.score2 + "",number.x+175,number.y);

	context.beginPath();
	context.arc(ball.x,ball.y,ball.radius,0,2*Math.PI);
	context.fillStyle = "red";
	context.fill();

	if(number.score2 === 5)
		{
			context.fillStyle = "green";
			context.font = "100px Arial";
			context.fillText("Player2 Won",(canvas.width)/2-250,(canvas.height/2)-50);
			ball.xDelta=0;
			ball.yDelta=0;
		}
	if(number.score1 === 5)
		{
			context.fillStyle = "green";
			context.font = "100px Arial";
			context.fillText("Player1 Won",(canvas.width)/2-250,(canvas.height/2)-50);
			ball.xDelta=0;
			ball.yDelta=0;
		}
}

const loop = function()
{
	draw();
	updateData();
	requestAnimationFrame(loop);
}
drawLine();
loop();
const upKey = 38;
const downKey = 40;
const wKey = 87;
const sKey = 83;

document.addEventListener('keydown', function(event) {
    if(event.keyCode === upKey)
	    {
			player2.pressedUpKey = true;
	    }
    if(event.keyCode === downKey)
	    {
	    	player2.pressedDownKey = true;
	    }
	if(event.keyCode === wKey)
	    {
			player1.pressedUpKey = true;
	    }
    if(event.keyCode === sKey)
	    {
	    	player1.pressedDownKey = true;
	    }
}, false);

document.addEventListener('keyup', function(event) {
   if(event.keyCode === upKey)
	    {
			player2.pressedUpKey = false;
	    }
    if(event.keyCode === downKey)
	    {
	    	player2.pressedDownKey = false;
	    }
	if(event.keyCode === wKey)
	    {
			player1.pressedUpKey = false;
	    }
    if(event.keyCode === sKey)
	    {
	    	player1.pressedDownKey = false;
	    }
}, false);

