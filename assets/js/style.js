// Timer variables
var timeEl = document.querySelector(".time");
var secondsLeft = 25;

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
      endQuiz();
    }
  }, 1000);
}

// Globally-used quiz variables
var currentQuestionIndex = 0;

// Array of objects with Quiz Content
var questions = [
  {
      question: "What is the capital of United Kingdom?",
      choices: ["London", "Paris", "Nairobi", "Prague"],
      correct: "London"
    }, 
   {
      question: "How many days are there in a week?",
      choices: ["Five", "Three", "Seven", "Eight"],
      correct: "Seven"
    }, 
   {
      question: "What is the closest planet to the sun?",
      choices: ["Earth", "Mercury", "Saturn", "Jupiter"],
      correct: "Mercury"
    },
]
// Once quiz starts, hide welcome container and display question container
function startQuiz() {
  // currentQuestionIndex = 0; need to declare again?
  document.getElementById('welcome-container').style.display = 'none';
  document.getElementById('question-container').style.display = 'block';
  // timerId = setInterval(updateTimer, 1000);
  showNextQuestion();
}

// 
function showNextQuestion() {
  resetState();
  displayQuestion(questions[currentQuestionIndex]);
}

// Dynamically display questions and create buttons with the answer choices
function displayQuestion(question) {
  var questionElement = document.getElementById('question');
  questionElement.textContent = question.question;
  question.choices.forEach(answer => {
      var button = document.createElement('button');
      button.textContent = answer;
      button.addEventListener('click', selectAnswer);
      document.getElementById('answer-buttons').appendChild(button);
  });
}

// Clear the answer-buttons after each question is answered
function resetState() {
  var answersContainer = document.getElementById('answer-buttons');
  answersContainer.textContent = '';
}

// Compare user selection with correct answer. Decrement timer by additional 10 seconds if user answered incorrectly
function selectAnswer(e) {
  var feedback = document.getElementById('feedback');
  var selectedButton = e.target;
  var correct = selectedButton.textContent === questions[currentQuestionIndex].correct;
  if (!correct) {
    secondsLeft -= 10;
    // feedback.textContent = "Wrong!" 
  // } else {
  //   feedback.textContent = "Correct!" 
  }

  currentQuestionIndex++;

  if (currentQuestionIndex >= questions.length) {
    endQuiz();
  } else {
    showNextQuestion();
  }
}

// Once quiz ends, hide timer & question container and display end container
function endQuiz() {
  document.getElementById('timer').style.display = 'none';
  document.getElementById('question-container').style.display = 'none';
  document.getElementById('end-container').style.display = 'block';
}

// Once Start Quiz is clicked, begin timer and startQuiz function
document.getElementById('start-btn').addEventListener('click', setTime);
document.getElementById('start-btn').addEventListener('click', startQuiz);