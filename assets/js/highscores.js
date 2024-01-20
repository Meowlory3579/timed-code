var highScore = document.getElementById('score-list');
// Get stored high scores from localStorage
var storedScores = JSON.parse(localStorage.getItem("allScores"));
  
// Sort the scores from highest to lowest. 
if (storedScores !== null) {
    storedScores.sort(function(a, b) {
    return b.score - a.score;
    })

    for (var i = 0; i < storedScores.length; i++) {
        var createLi = document.createElement("li");
        createLi.textContent = storedScores[i].initials + ": " + storedScores[i].score;
        highScore.appendChild(createLi);
    }
}

