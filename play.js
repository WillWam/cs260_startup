let logFunctions = true;
function DebugA(logMessage) {
    if(logFunctions) {
        console.log(logMessage);
    }
}
let playerUsername = "none";
let activePlayers = [
    
];

function logIn() {
    DebugA("logIn");
    playerUsername = localStorage.getItem("username");
    const loggedInText = document.getElementById("logged-in-text");
    loggedInText.innerHTML = "Logged in - " + playerUsername;

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
    const activeUsersUl = document.getElementById("active-players-ul");
    const playerInfoTitle = document.getElementById("player-info-title");

    activeUsersUl.innerHTML = "";
    playerInfoTitle.innerHTML = "Active Players: " + String(activePlayers.length);
    console.log(activePlayers);

    DebugA("addAllActivePlayers");
    activePlayers.forEach((player) => addActivePlayer(player));
}

function submitQuestion() {
    const questionBar = document.getElementById("question-bar");
    let question = questionBar.value;
    DebugA("addActivePlayer: " + playerUsername);
    let validQuestion = true;
    let answer = "yes";
    if(Math.random() < 0.33) {
        answer = "no";
    } else if (Math.random() < 0.5) {
        answer = "maybe";
    }
    if(validQuestion) {
        addAnswer(question, answer, playerUsername);
    } else {

    }

    questionBar.value = "";
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

logIn();