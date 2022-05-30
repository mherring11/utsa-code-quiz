containerEl = document.querySelector(".opening-container");

var scoreIdCounter = 0;
var timeLeft = 50;
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
    timeLeft = timeLeft - 5;
    questionTwo();
}

// Second Question
var questionTwo = function () {
    questionEl.textContent = "Question #2: What is the use of the blur function:";
    answerChoiceOne.textContent = "Blur function creates an alert";
    answerChoiceTwo.textContent = "Blur function is used to remove the focus from the specified object";
    answerChoiceThree.textContent = "Blur function creates a variable";
    answerChoiceFour.textContent = "Blur function is used to place focus on an object";

    answerChoiceOne.addEventListener("click", questionThree);
    answerChoiceTwo.addEventListener("click", rightAnswerTwo);
    answerChoiceThree.addEventListener("click", wrongAnswerTwo);
    answerChoiceFour.addEventListener("click", questionThree);
}

var rightAnswerTwo = function () {
    timeLeft = timeLeft + 5
    questionThree();
}
var wrongAnswerTwo = function () {
    timeLeft = timeLeft - 5;
    questionThree();
}

var questionThree = function () {
    questionEl.textContent = "Question #3: DOM stands for:"
    answerChoiceOne.textContent = "document open model";
    answerChoiceTwo.textContent = "drop on model";
    answerChoiceThree.textContent = "dynamic object model";
    answerChoiceFour.textContent = "document object model";

    answerChoiceOne.addEventListener("click", questionFour);
    answerChoiceTwo.addEventListener("click", wrongAnswerThree);
    answerChoiceThree.addEventListener("click", questionFour);
    answerChoiceFour.addEventListener("click", rightAnswerThree);
}

var rightAnswerThree = function () {
    timeLeft = timeLeft + 5
    questionFour();
}
var wrongAnswerThree = function () {
    timeLeft = timeLeft - 5;
    questionFour();
}

// Fourth Question
var questionFour = function () {
    questionEl.textContent = "Question #4: How can you add a comment in a JavaScript"
    answerChoiceOne.textContent = "append.note: This is a comment";
    answerChoiceTwo.textContent = "<!--This is a comment-->";
    answerChoiceThree.textContent = "//This is a comment";
    answerChoiceFour.textContent = "'This is a comment'";

    answerChoiceOne.addEventListener("click", questionFive);
    answerChoiceTwo.addEventListener("click", questionFive);
    answerChoiceThree.addEventListener("click", rightAnswerFour);
    answerChoiceFour.addEventListener("click", wrongAnswerFour);
}

var rightAnswerFour = function () {
    timeLeft = timeLeft + 5
    questionFive();
}
var wrongAnswerFour = function () {
    timeLeft = timeLeft - 5;
    questionFive();
}

// Fifth Question
var questionFive = function () {
    questionEl.textContent = "Question #5: Inside which HTML element do we put the JavaScript?"
    answerChoiceOne.textContent = "<script>";
    answerChoiceTwo.textContent = "<javascript>";
    answerChoiceThree.textContent = "<js>";
    answerChoiceFour.textContent = "<scripting>";

    answerChoiceOne.addEventListener("click", rightAnswerFive);
    answerChoiceTwo.addEventListener("click", gameOver);
    answerChoiceThree.addEventListener("click", wrongAnswerFive);
    answerChoiceFour.addEventListener("click", gameOver);
}

var rightAnswerFive = function () {
    timeLeft = timeLeft + 5
    gameOver();
}
var wrongAnswerFive = function () {
    timeLeft = timeLeft - 5;
    gameOver();
}


var gameOver = function () {
    clearInterval(timeInterval);
    var closingHeaderEl = document.createElement("h1");
    closingHeaderEl.textContent = "Game Over";
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