var playing = false;
var score;
var action;
var timeRemaining;
var correctAnswer;

// if we click on the start/reset
document.getElementById("startreset").onclick = function(){
	// if we are playing
	if(playing == true) {

		location.reload();//reload page

	}else{ // if we are not playing

		playing = true;

		//set score to 0

		score = 0;
		document.getElementById("scorevalue").innerHTML = score;

		//show countdown box 

		show("timeremaining");
		timeRemaining = 60;
		document.getElementById("timeRemainingValue").innerHTML = timeRemaining;

		// hide game over box

		hide("gameOver");

		//change button to reset

		document.getElementById("startreset").innerHTML = "Reset Game";

		//start countdown

		startCountdown();

		//generate a new Q&A

		generateQA()
	}
}

for(var i = 1; i < 5; i++) {
	document.getElementById("box" + i).onclick = function() {
		if(playing == true) {
			if(this.innerHTML == correctAnswer) {
				score++;
				document.getElementById("scorevalue").innerHTML = score;

				hide("wrong");
				show("correct");
				setTimeout(function(){
					hide("correct");
				}, 1000);
				generateQA();
			}else {
				score--;
				document.getElementById("scorevalue").innerHTML = score;
				hide("correct");
				show("wrong");
				setTimeout(function(){
					hide("wrong");
				}, 1000)
			}
		}
	}
}
		
// functions

//start counter

function startCountdown() {
	action = setInterval(function(){
		timeRemaining -= 1;
		document.getElementById("timeRemainingValue").innerHTML = timeRemaining;
		if(timeRemaining == 0 ) {// game over
			stopCountdown();
			show("gameOver");
		document.getElementById("gameOver").innerHTML = "<p>Game over!</p><p>Your score is " + score +".</p>";
			hide("timeremaining");
			hide("correct");
			hide("wrong");
			playing = false;
			document.getElementById("startreset").innerHTML = "Start Game";
		}	
	}, 1000);
}

//stop counter

function stopCountdown() {
	clearInterval(action);
}

//hide an element

function hide(id) {
	document.getElementById(id).style.display = "none";
}

//show an element

function show(id) {
	document.getElementById(id).style.display = "block";
}

//generate question and multiple answers

function generateQA() {
	var x = 1 + Math.round(9 * Math.random());
	var y = 1 + Math.round(9 * Math.random());
	correctAnswer = x * y;
	document.getElementById("question").innerHTML = x + "x" + y;
	var correctPosition = 1 + Math.round(3 * Math.random());
	document.getElementById("box" + correctPosition).innerHTML = correctAnswer; //fill one box with the correct answer
	
	var answers = [correctAnswer];


	for(var i = 1; i<5; i++) {
		if(i != correctPosition) {
			var wrongAnswer;
			do{
				wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
			}while(answers.indexOf(wrongAnswer)>-1)
			document.getElementById("box" + i).innerHTML = wrongAnswer;
			answers.push(wrongAnswer);
		}
	}
}