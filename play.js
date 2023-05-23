let logFunctions = true;
function DebugA(logMessage) {
    if(logFunctions) {
        console.log(logMessage);
    }
}
let playerUsername = "Default_Username";
let activePlayers = [
    "Will_Wam",
    "Cameron",
    "Test_User",
    "Awesome_Guy"
];

function logIn(username) {
    DebugA("logIn");
    const loggedInText = document.getElementById("logged-in-element");
    loggedInText.innerHTML = "Logged in - " + username;
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
    activePlayers.forEach((player) => addActivePlayer(player));
}

function submitQuestion() {
    const questionBar = document.getElementById("question-bar");
    let question = questionBar.value;
    DebugA("addActivePlayer: " + playerUsername);
    let validQuestion = true;
    let answer = "yes";
    if(Math.random() < 0.3) {
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
    newAnswer.innerHTML += question + " - " + username;

    answerLog.appendChild(newAnswer);
}

addAllActivePlayers();
addAnswer("is it cool?", "no", "Will");