// Timer variables
var timeEl = document.querySelector(".time");
var beginButton = document.querySelector("#begin");
var secondsLeft = 10;

// Display time remaining in timeEl
timeEl.textContent = "Time Remaining: " + secondsLeft + " seconds";

// Set timer
function setTime() {
  // If secondsLeft > 0, decrement timer by one second until 0 & display timer in timeEl
  var timerInterval = setInterval(function() {
    if(secondsLeft > 0) { 
      secondsLeft--;
      timeEl.textContent = "Time Remaining: " + secondsLeft + " seconds";
    } else {
      // Stop timer when secondsLeft is 0
      clearInterval(timerInterval);
      timeEl.textContent = "Time is up!";
    }
  }, 1000);
}

// Add event listener to begin button, so timer doesn't initialize until clicked
beginButton.addEventListener("click", setTime); 






// Quiz variables
var questionText = document.getElementById("question-text");
var choice1 = document.getElementById("choice1");
var choice2 = document.getElementById("choice2");
var choice3 = document.getElementById("choice3");
var choice4 = document.getElementById("choice4");

// Objects to collect the quiz information
var question1 = {
    question: "What is the capital of United Kingdom?",
    choices: ["London", "Paris", "Nairobi", "Prague"],
    correct: 0
  }

  var question2 = {
    question: "How many days are there in a week?",
    choices: ["Five", "Three", "Seven", "Eight"],
    correct: 2
  }

  var question3 = {
    question: "What is the closest planet to the sun?",
    choices: ["Earth", "Mercury", "Saturn", "Jupiter"],
    correct: 1
  }

  console.log(question1.question);
  console.log(question1.choices);

  // find a way to loop all this
  questionText.textContent = question1.question;
  choice1.textContent = question1.choices[0];
  choice2.textContent = question1.choices[1];
  choice3.textContent = question1.choices[2];
  choice4.textContent = question1.choices[3];










// // Timer
// base = 60-75 seconds
// if wrong answer decrement by 5-10 seconds

// // Start Quiz
// present multiple-choice question
// return "correct or "wrong"

// // once complete
// present score
// provide form for initials and submit

// // link to high scores  


