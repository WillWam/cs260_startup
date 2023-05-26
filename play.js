let logFunctions = true;
function DebugA(logMessage) {
    if(logFunctions) {
        console.log(logMessage);
    }
}
let playerUsername = "none";
let activePlayers = [
    
];
let questionsLog = [
    // {
    //     id: 2020,
    //     question: "Is it a cool thing?",
    //     answer: "yes",
    //     username: "Will_Wam"
    // }
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
    if(!activePlayers.includes(username)) {
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

function populateQuestionsLogArray() {
    questionsLog = [];
    if(localStorage.getItem("latestQuestion") != null) {
        questionsLog.push(JSON.parse(localStorage.getItem("latestQuestion")));
    }
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

    // populateQuestionsLogArray();

    const answerLogUl = document.getElementById("answer-log-ul");
    const questionsAnswered = document.getElementById("questions-answered");

    answerLogUl.innerHTML = "";
    questionsAnswered.innerHTML = "" + String(questionsLog.length) + " Questions Answered So Far";
    DebugA(questionsAnswered);

    questionsLog.forEach((answerObject) => addAnswer(answerObject.question, answerObject.answer, answerObject.username));
}

logIn();
addAllAnswers();