let logFunctions = true;
function DebugA(logMessage) {
    if(logFunctions) {
        console.log(logMessage);
    }
}
let playerUsername = "none";
let currentWord;
let activePlayers = [
    
];
let questionsLog = [

];

function logIn() {
    DebugA("logIn");
    playerUsername = localStorage.getItem("username");
    const loggedInText = document.getElementById("logged-in-text");
    
    if(playerUsername != null) {
        loggedInText.innerHTML = "Logged in - " + playerUsername;
    } else {
        loggedInText.innerHTML = "Not Logged In";
    }

    pushUniquePlayer(playerUsername);
    addAllActivePlayers();
}

function pushUniquePlayer(username) {
    DebugA("pushUniquePlayer: " + username);
    if(!activePlayers.includes(username) && username !== null) {
        activePlayers.push(username);
    }
}

function addActivePlayer(username) {
    DebugA("addActivePlayer: " + username);

    const activeUsersUl = document.getElementById("active-players-ul");
    const newUserItem = document.createElement("SECTION");
    newUserItem.innerHTML = username;
    newUserItem.setAttribute("class", "player-item");
    activeUsersUl.appendChild(newUserItem);
}

function addAllActivePlayers() {
    DebugA("addAllActivePlayers");
    const activeUsersUl = document.getElementById("active-players-ul");
    const playerInfoTitle = document.getElementById("player-info-title");

    activeUsersUl.innerHTML = "";
    playerInfoTitle.innerHTML = "Active Players: " + String(activePlayers.length);
    DebugA(activePlayers);

    activePlayers.forEach((player) => addActivePlayer(player));
}

function submitQuestion() {
    const questionBar = document.getElementById("question-bar");
    let question = questionBar.value;
    
    let answer = "yes";
    if(Math.random() < 0.33) {
        answer = "no";
    } else if (Math.random() < 0.5) {
        answer = "maybe";
    }
    let currentUsername = "";
    if(playerUsername === null) {
        displayUsername = "Anonymous";
    } else {
        displayUsername = playerUsername;
    }

    let validQuestion = true;
    if(validQuestion) {
        newQuestionItem = {
            id: 2020,
            question: question,
            answer: answer,
            username: displayUsername
        }
        pushUniqueQuestion(newQuestionItem);
        addAllAnswers();
    } else {

    }

    questionBar.value = "";
}

function pushUniqueQuestion(questionItem) {
    DebugA("pushUnique Question: " + questionItem);
    if(!questionsLog.includes(questionItem)) {
        questionsLog.push(questionItem);
    }

    localStorage.setItem("latestQuestion", JSON.stringify(questionItem));
}

async function populateQuestionsLogArray() {
    DebugA("populate Question Log array");
    const response = await fetch('/api/questionLog');
    DebugA(response);
    questionsLog = await response.json();
    DebugA(questionsLog);
    addAllAnswers();
}

function addAnswer(question, answer, username) {
    DebugA("addAnswer " + question);

    const answerLog = document.getElementById("answer-log-ul");
    const elementTemplate = document.getElementById(answer + "-template");
    const newAnswer = elementTemplate.cloneNode(true);
    newAnswer.setAttribute("id", "");
    newAnswer.setAttribute("style", "display: block;");
    newAnswer.innerHTML += question + " - " + username;

    answerLog.appendChild(newAnswer);
}

function addAllAnswers() {
    DebugA("add All Answers");

    const answerLogUl = document.getElementById("answer-log-ul");
    const questionsAnswered = document.getElementById("questions-answered");

    answerLogUl.innerHTML = "";
    questionsAnswered.innerHTML = "" + String(questionsLog.length) + " Questions Answered So Far";
    DebugA(questionsAnswered);

    questionsLog.forEach((answerObject) => addAnswer(answerObject.question, answerObject.answer, answerObject.username));
}

function delay(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, milliseconds);
    });
  }

async function fakeUsers() {
    let fakeNames = ["Bob", "Sue", "Mary", "Willllkk", "Masterbro", "coolguy", "awesomepenguin"]
    for(let i=0; i<7; i++) {
        await delay(2000);
        pushUniquePlayer(fakeNames[i]);
        addAllActivePlayers();
    }
}

async function setWordDisplay(difficulty) {
    const difficultyDisplay = document.getElementById("difficulty-display");
    difficultyDisplay.textContent = "Difficulty: " + difficulty;
    difficultyDisplay.setAttribute("class",difficulty);
    DebugA("word dif set to " + difficulty);
}

async function newWord() {
    const response = await fetch("https://random-word-api.vercel.app/api?words=1");
    newWord = await response.json();
    DebugA("New word to be set: " + newWord);

    await newWord;
    DebugA("here");

    const responseSetWord = await fetch('/api/newWord', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(newWord),
    });
}

async function getWord() {
    const response = await fetch('/api/word');
    currentWord = await response.json();
    currentWord = String(currentWord);

    if(currentWord.length > 7) {
        setWordDisplay("Hard");
    } else if(currentWord.length > 5) {
        setWordDisplay("Medium");
    } else {
        setWordDisplay("Easy");
    }
    DebugA("current word retrieved: " + currentWord);
}

logIn();
addAllAnswers();
fakeUsers();
newWord();
getWord();