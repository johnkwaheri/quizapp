$(document).ready(function() {
$('h1');
$('.status');
generateQuestions();
generateAnswers();
submit();
restart();
}); 

var currentQuestion = 0;
var selectedAnswer = "";
var score = 0;
var questions = new Array();


//list of questions
function Question(currentQuestion,answers,correct) {
	this.currentQuestion = currentQuestion;
	this.answers = answers;
	this.correct = correct;
}


//Question list - ("Question", ["answer1", "answer2", "answer3", "answer4", "answer5"],  Number of correct answer position 0 - 4) 
questions [0] = new Question ("What is this question?", ["wrong","wrong","right","wrong", "wrong"], 2);
questions [1] = new Question ("What is this question?", ["wrong","wrong","right","wrong", "wrong"], 2);
questions [2] = new Question ("What is this question?", ["wrong","wrong","right","wrong", "wrong"], 2);
questions [3] = new Question ("What is this question?", ["wrong","wrong","right","wrong", "wrong"], 2);
questions [4] = new Question ("What is this question?", ["wrong","wrong","right","wrong", "wrong"], 2);
questions [5] = new Question ("What is this question?", ["wrong","wrong","right","wrong", "wrong"], 2);
questions [6] = new Question ("What is this question?", ["wrong","wrong","right","wrong", "wrong"], 2);
questions [7] = new Question ("What is this question?", ["wrong","wrong","right","wrong", "wrong"], 2);
questions [8] = new Question ("What is this question?", ["wrong","wrong","right","wrong", "wrong"], 2);
questions [9] = new Question ("What is this question?", ["wrong","wrong","right","wrong", "wrong"], 2);

//questions appear
function generateQuestions() {
var q = questions [currentQuestion].currentQuestion;
$('#heading').append('<h4>' + q + '</h4>');
}

//answers appear
function generateAnswers(){
var write = "";
var a1 = questions [currentQuestion].answers;
for (var i = 0; i < a1.length; i++) {
    write += "<li><input type='radio' name='radio' class='option' value=" +(i)+ ">" + a1[i]+ "</li>";
}
$("#answers").append(write);
}

//radio button being clicked
function submit(){
$('.option').click(function() {
   if($("input[type='radio'][name='radio']").is(':checked')) { 
   	evaluation();
   	$('.option').attr('disabled',true); 
   }
});
}

//evaluate answer 
function evaluation() {
var selected = $("input[type='radio'][name='radio']:checked");
	if (selected.length >= 0) {
    	selectedAnswer = selected.val();
	}
	if (selectedAnswer == questions [currentQuestion].correct) {
		$('#correct').append("<p>Correct!</p>");
		$('#next').append("<p>Next</p>");
		$('#correct-answer').append("<p>The answer is" + " " + questions[currentQuestion].answers[questions [currentQuestion].correct] + "</p>").hide().delay(400).fadeIn('400');
		nextQuestion();
		playerScore();
		currentQuestion++;
	}
	
	else {
		$('#incorrect').append("<p>Incorrect.</p>");
		$('#next').append("<p>Next</p>");
		$('#correct-answer').append("<p>Incorrect! The correct answer is" + " " + questions[currentQuestion].answers[questions [currentQuestion].correct] + "</p>").hide().delay(400).fadeIn('400');
		nextQuestion();
		currentQuestion++;
	}
}

//next question 
function nextQuestion() {
 	$("#next").click(function() {
		$('h4').remove();
		$('li').remove();
		$(".outcome p").remove();

if (currentQuestion >= 10) {
	complete();
	restart();
	return;
	}
else {
	questionNumber();
	generateQuestions();
	generateAnswers();
	submit();
	}
});

}

//set score
function playerScore() {
	$('#score p').remove();
	score++;
	$('#score').append(" " + '<p>' + score + '</p>');

}

//question marker
function questionNumber() {
	$('#question p').remove();
	$('#question').append(" " + '<p>' + (currentQuestion +1) + '/10</p>');
}

//final tally
function complete() {
	$('.status').hide();
	$('#heading').append("<h4>You scored" + " " + score + " " + "out of 10 <br>" + "<div class='restart'><p>Restart</p></div></h4>");
	$('.restart').addClass('quiz-end');
}

//restart button
function restart() {
	$('.restart').click(function() {
		$('.restart').removeClass('quiz-end');
		currentQuestion = 0;
		score = (score-(score+1));
		questions [0];
		$('#score');
		$('#question');
		$('h4').remove();
		$('li').remove();
		$(".outcome p").remove();
		questionNumber();
		generateQuestions();
		generateAnswers();
		submit();
		playerScore();
		$('.status').show();
	});
}