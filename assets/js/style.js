// Globally-used variables
var timeEl = document.querySelector(".time");
var secondsLeft = 35;
var timerInterval = 0;
var initials = document.getElementById('initials');
var saveButton = document.getElementById('save-btn');
var currentQuestionIndex = 0; // Keeps track of which question from the questions array is currently being displayed

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

// Display time remaining in timeEl
timeEl.textContent = "Time Remaining: " + secondsLeft + " seconds";

// Initialize startQuiz function once Start Quiz button is clicked
document.getElementById('start-btn').addEventListener('click', startQuiz);

// Once quiz starts, hide welcome-container, display quiz-container, and start timer
function startQuiz() {
  // If secondsLeft > 0, decrement timer by one second until 0 & display timer in timeEl. Penalty incorporated later on
  timerInterval = setInterval(function () {
    if (secondsLeft > 0) {
      secondsLeft--;
      timeEl.textContent = "Time Remaining: " + secondsLeft + " seconds";
    } else {
      // Stop timer when secondsLeft is 0
      endQuiz();
    }
  }, 1000);

  document.getElementById('welcome-container').style.display = 'none';
  document.getElementById('quiz-container').style.display = 'block';
  showNextQuestion();
}

// Reset to clear previous data. Incrementally take objects from the questions array and pass to the displayQuestion function
function showNextQuestion() {
  reset();
  displayQuestion(questions[currentQuestionIndex]);
}

// Clear the answer-buttons text after each question is answered
function reset() {
  var answersContainer = document.getElementById('answer-buttons');
  answersContainer.textContent = '';
}

// Dynamically display questions and create buttons with the answer choices
function displayQuestion(questionObject) {
  var questionElement = document.getElementById('question');
  questionElement.textContent = questionObject.question;
  questionObject.choices.forEach(answer => {
    var button = document.createElement('button');
    button.textContent = answer;
    button.classList.add('answer-buttons'); // sets button style in CSS
    button.addEventListener('click', selectAnswer);
    document.getElementById('answer-buttons').appendChild(button);
  });
}

// Compare user selection with correct answer. Decrement timer by additional 10 seconds if user answered incorrectly
function selectAnswer(e) {
  var selectedButton = e.target;
  var correct = selectedButton.textContent === questions[currentQuestionIndex].correct;

  // If = prevents negative secondsLeft value. Else if = decrement by 10 seconds for incorrect answers
  if (!correct && secondsLeft <= 10) {
    secondsLeft = 0;
  } else if (!correct) {
    secondsLeft -= 10;
  }

  // Move to next questions object
  currentQuestionIndex++;

  // Continue until reached end of questions
  if (currentQuestionIndex >= questions.length) {
    endQuiz();
  } else {
    showNextQuestion();
  }
}

// Once quiz ends, clear timer, hide quiz-container and display end-container
function endQuiz() {
  clearInterval(timerInterval)
  document.getElementById('quiz-container').style.display = 'none';
  document.getElementById('end-container').style.display = 'block';
  document.getElementById('score').textContent = 'Your final score is: ' + secondsLeft;
  timeEl.textContent = "Time Remaining: " + secondsLeft + " seconds";
}

// Disable save button until initials are input
initials.addEventListener('input', function() {
  var initialsInput = this.value.trim();

  if (initialsInput) {
    saveButton.disabled = false; // Enable button if initials are entered
  } else {
    saveButton.disabled = true; // Keep button disabled if initials are empty
  }
})

// Initialize saveScore function once Save button is clicked
document.getElementById('save-btn').addEventListener('click', saveScore);

// Save score and initials to local storage. Disable Save button
function saveScore() {
  var newScore = {
    score: secondsLeft,
    initials: initials.value,
  }

  var allScores = localStorage.getItem("allScores");
  if (allScores === null) {
      allScores = [];
  } else {
      allScores = JSON.parse(allScores);
  }
  allScores.push(newScore);
  var storedScores = localStorage.setItem("allScores", JSON.stringify(allScores));

  // Disable save button and return thank you message
  saveButton.disabled = true; 
  var thankYou = document.getElementById('thank-you');
  thankYou.textContent = 'Thank you!';
}

// play again = reloads page

