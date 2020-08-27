function Quiz(questions) 
{
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}
 
Quiz.prototype.getQuestionIndex = function() 
{
  return this.questions[this.questionIndex];
}
 
Quiz.prototype.guess = function(answer) 
{
  if(this.getQuestionIndex().isCorrectAnswer(answer)) 
  {
    this.score++;
  }
  this.questionIndex++;
}
 
Quiz.prototype.isEnded = function() 
{
  return this.questionIndex === this.questions.length;
}

function Question(text, choices, answer) 
{
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}
 
Question.prototype.isCorrectAnswer = function(choice) 
{
  return this.answer === choice;
}
 
 
function populate() 
{
  if(quiz.isEnded()) 
  {
    showScores();
  }
  else 
  {
    // show question
    var element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionIndex().text;      
    // show options
    var choices = quiz.getQuestionIndex().choices;
    for(var i = 0; i < choices.length; i++) 
    {
      var element = document.getElementById("choice" + i);
      element.innerHTML = choices[i];
      guess("btn" + i, choices[i]);
    }
    showProgress();
  }
};
 
function guess(id, guess) 
{
  var button = document.getElementById(id);
  button.onclick = function()
  {
    quiz.guess(guess);
    populate();
  }
};
function showProgress() 
{
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};
 
function showScores() 
{
  var gameOverHTML = "<h1>Result</h1>";
  gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHTML;
};
 
// create questions here
var questions = [
    new Question("What does HTML stand for?", ["Home Tool Markup Language", "Hyper Text Markup Language","Hyperlinks and Text Markup Language", "Hyperlink Markup Language"], "Hyper Text Markup Language"),
    new Question("Who is making the Web standards?", ["Microsoft", "Google", "The World Wide Web Consortium", "Mozilla"], "The World Wide Web Consortium"),
    new Question("Choose the correct HTML element for the largest heading:", ["<h1>", "<p>","<heading>", "<h6>"], "<h1>"),
    new Question("What is the correct HTML element for inserting a line break?", ["<break>", "<lb>", "<br>", "All of the above"], "<br>"),
    new Question("Which of these elements are all <table> elements?", ["<thead>,<tbody>,<tr>", "<table>,<tr>,<td>", "<table>,<tr>,<tt>", "<table>,<head>,<foot>"], "<table>,<tr>,<td>")
];

// create quiz
var quiz = new Quiz(questions);
 
// display quiz
populate();