containerEl = document.querySelector(".opening-container");

var scoreIdCounter = 0;
var timeLeft = 75;
var timeInterval;

var scores = [];
var timerEl = document.getElementById('timer');
var quizContainerEl = document.createElement("div");
var questionEl = document.createElement("h1");
questionEl.className = "question";
var answerListEl = document.createElement("ul");
answerListEl.className = "answer-list";
var answerChoiceOne = document.createElement("button");
answerChoiceOne.className = ("btn");
var answerChoiceTwo = document.createElement("button");
answerChoiceTwo.className = ("btn");
var answerChoiceThree = document.createElement("button");
answerChoiceThree.className = ("btn");
var answerChoiceFour = document.createElement("button");
answerChoiceFour.className = ("btn");
var closingContainerEl = document.createElement("div");
var viewScoreContainer = document.createElement("div");


var countdown = function () {
    timeInterval = setInterval(function () {
        if (timeLeft > 0) {
            timerEl.textContent = 'Time: ' + timeLeft;
            timeLeft--;
        }
        else {
            timerEl.textContent = 'Time: 0';
            clearInterval(timeInterval);
            gameOver();
        }
    }, 1000);
}

// when Start Quiz is clicked, first question shows up:
var beginQuiz = function () {
    questionEl.textContent = "Question #1: Which company developed JavaScript:";
    quizContainerEl.appendChild(questionEl);

    answerChoiceOne.textContent = "Netscape";
    answerListEl.appendChild(answerChoiceOne);

    answerChoiceTwo.textContent = "Google";
    answerListEl.appendChild(answerChoiceTwo);

    answerChoiceThree.textContent = "Microsoft";
    answerListEl.appendChild(answerChoiceThree);

    answerChoiceFour.textContent = "Amazon Web Services";
    answerListEl.appendChild(answerChoiceFour);

    quizContainerEl.appendChild(answerListEl);
    containerEl.replaceWith(quizContainerEl);

    answerChoiceOne.addEventListener("click", questionTwo);
    answerChoiceTwo.addEventListener("click", wrongAnswer);
    answerChoiceThree.addEventListener("click", wrongAnswer);
    answerChoiceFour.addEventListener("click", wrongAnswer);
}

var wrongAnswer = function () {
    timeLeft = timeLeft - 10;
    questionTwo();
}

// Second Question
var questionTwo = function () {
    questionEl.textContent = "Question #2: The condition in an if/else statement is enclosed with:";
    answerChoiceOne.textContent = "quotes";
    answerChoiceTwo.textContent = "parenthesis";
    answerChoiceThree.textContent = "curly brackets";
    answerChoiceFour.textContent = "square brackets";

    answerChoiceOne.addEventListener("click", questionThree);
    answerChoiceTwo.addEventListener("click", rightAnswerTwo);
    answerChoiceThree.addEventListener("click", wrongAnswerTwo);
    answerChoiceFour.addEventListener("click", questionThree);
}

var rightAnswerTwo = function () {
    timeLeft = timeLeft + 10
    questionThree();
}
var wrongAnswerTwo = function () {
    timeLeft = timeLeft - 10;
    questionThree();
}

// Third Question
var questionThree = function () {
    questionEl.textContent = "Question #3: Arrays in JavaScript can be used to store:"
    answerChoiceOne.textContent = "numbers and strings";
    answerChoiceTwo.textContent = "other arrays";
    answerChoiceThree.textContent = "booleans";
    answerChoiceFour.textContent = "all of the above";

    answerChoiceOne.addEventListener("click", questionFour);
    answerChoiceTwo.addEventListener("click", wrongAnswerThree);
    answerChoiceThree.addEventListener("click", questionFour);
    answerChoiceFour.addEventListener("click", rightAnswerThree);
}

var rightAnswerThree = function () {
    timeLeft = timeLeft + 10
    questionFour();
}
var wrongAnswerThree = function () {
    timeLeft = timeLeft - 10;
    questionFour();
}

// Fourth Question
var questionFour = function () {
    questionEl.textContent = "Question #4: String values must be enclose within ____ when being assigned to variables."
    answerChoiceOne.textContent = "commas";
    answerChoiceTwo.textContent = "curly brackets";
    answerChoiceThree.textContent = "quotes";
    answerChoiceFour.textContent = "parenthesis";

    answerChoiceOne.addEventListener("click", questionFive);
    answerChoiceTwo.addEventListener("click", questionFive);
    answerChoiceThree.addEventListener("click", rightAnswerFour);
    answerChoiceFour.addEventListener("click", wrongAnswerFour);
}

var rightAnswerFour = function () {
    timeLeft = timeLeft + 10
    questionFive();
}
var wrongAnswerFour = function () {
    timeLeft = timeLeft - 10;
    questionFive();
}

// Fifth Question
var questionFive = function () {
    questionEl.textContent = "Question #5: A very useful tool used during development and debugging for printing content to the debugger is:"
    answerChoiceOne.textContent = "console.log";
    answerChoiceTwo.textContent = "JavaScript";
    answerChoiceThree.textContent = "terminal/bash";
    answerChoiceFour.textContent = "for loops";

    answerChoiceOne.addEventListener("click", rightAnswerFive);
    answerChoiceTwo.addEventListener("click", gameOver);
    answerChoiceThree.addEventListener("click", wrongAnswerFive);
    answerChoiceFour.addEventListener("click", gameOver);
}

var rightAnswerFive = function () {
    timeLeft = timeLeft + 10
    gameOver();
}
var wrongAnswerFive = function () {
    timeLeft = timeLeft - 10;
    gameOver();
}

// Game Over
var gameOver = function () {
    clearInterval(timeInterval);
    var closingHeaderEl = document.createElement("h1");
    closingHeaderEl.textContent = "All done!";
    closingContainerEl.appendChild(closingHeaderEl);

    var closingCommentEl = document.createElement("p");
    closingCommentEl.className = ("closing-message");
    closingCommentEl.innerHTML = "Your final score is " + timeLeft;
    closingContainerEl.appendChild(closingCommentEl);

    var closingFormEl = document.createElement("form");

    enterInitials = document.createElement("p");
    enterInitials.className = ("closing-message");
    enterInitials.textContent = "Enter initials:";
    closingFormEl.appendChild(enterInitials);

    var inputInitials = document.createElement("input");
    inputInitials.className = ("input-form");
    closingFormEl.appendChild(inputInitials);
    var submitButtonEl = document.createElement("button");
    submitButtonEl.className = ("submit-btn");
    submitButtonEl.textContent = "Submit";
    closingFormEl.appendChild(submitButtonEl);

    closingContainerEl.appendChild(closingFormEl);
    quizContainerEl.replaceWith(closingContainerEl);

    closingFormEl.addEventListener("submit", saveScore);
}

var saveScore = function (event) {
    event.preventDefault();
    var initialInput = document.querySelector("input[class='input-form']").value;
    var scoreObj = { initial: initialInput, time: timeLeft, };
    scoreObj.id = scoreIdCounter;
    scores.push(scoreObj);
    localStorage.setItem("scores", JSON.stringify(scores))
    viewScore(scoreObj);
}

var loadScore = function () {
    var savedScore = localStorage.getItem("scores");
    if (!savedScore) {
        return false;
    }
    savedScore = JSON.parse(savedScore);

    for (var i = 0; i < savedScore.length; i++) {
        viewScore(savedScore[i]);
    }
}

// View Scores
var viewScore = function (scoreObj) {

    document.getElementById("view-score").disabled = true;

    containerEl.replaceWith(viewScoreContainer);

    viewScoreHeader = document.createElement("h1");
    viewScoreHeader.textContent = "View Score";
    viewScoreContainer.appendChild(viewScoreHeader);

    var viewScoreList = document.createElement("ul");
    viewScoreList.className = ("view-score-list");

    listItem = document.createElement("li");
    listItem.innerHTML = scoreObj.initial + ": " + scoreObj.time;
    viewScoreList.appendChild(listItem);

    viewScoreContainer.appendChild(viewScoreList);

    var goBack = document.createElement("button");
    goBack.className = ("btn");
    goBack.textContent = "Go back";
    viewScoreContainer.appendChild(goBack);

    closingContainerEl.replaceWith(viewScoreContainer);

    goBack.addEventListener("click", startPage);
}

startPage = function () {
    location.reload();
}

document.getElementById("start-button").addEventListener("click", countdown);
document.getElementById("start-button").addEventListener("click", beginQuiz);
document.getElementById("view-score").addEventListener("click", loadScore);