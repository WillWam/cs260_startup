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
    console.log("player username: " + playerUsername);
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
    // DebugA("addActivePlayer: " + username);

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
    // DebugA(activePlayers);

    activePlayers.forEach((player) => addActivePlayer(player));
}

async function submitWordGuess() {
    DebugA("submit word guess");

    const wordGuessBar = document.getElementById("word-guess-bar");
    let wordGuess = wordGuessBar.value;
    wordGuessBar.value = "";

    let displayUsername = "";
    if(playerUsername === null) {
      displayUsername = "Anonymous";
    } else {
      displayUsername = playerUsername;
    }

    let wordGuessItem = {
        username: displayUsername,
        word: wordGuess,
    }

    DebugA(wordGuessItem);
    
    let wordCorrectStatus = await fetch('/api/askQuestion', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(questionItem),
    });
    wordCorrectStatus = await wordCorrectStatus.json();
    DebugA("answer returned: " + wordCorrectStatus);

    if(wordCorrectStatus === true) {
        wordGuessRight(wordGuessItem);
    } else {
        wordGuessWrong(wordGuessItem);
    }
}

function wordGuessRight(wordGuessItem) {
    DebugA("Word was guessed correctly: " + wordGuessItem.word + " by " + wordGuessItem.username);
}

function wordGuessWrong(wordGuessItem) {
    DebugA("Word incorrect :( " + wordGuessItem.word + " by " + wordGuessItem.username);
}

async function submitQuestion() {
    DebugA("submit question");

    const questionBar = document.getElementById("question-bar");
    let question = questionBar.value;
    questionBar.value = "";

    let displayUsername = "";
    if(playerUsername === null) {
      displayUsername = "Anonymous";
    } else {
      displayUsername = playerUsername;
    }

    let questionItem = {
        username: displayUsername,
        question: question,
        answer: "none",
        date: "6/1/23"
    }

    DebugA(questionItem);
    
    let answerItem = await fetch('/api/askQuestion', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(questionItem),
    });
    answerItem = await answerItem.json();
    DebugA("answer returned: " + answerItem);

    populateQuestionsLogArray();

}

function pushUniqueQuestion(questionItem) {
    DebugA("pushUnique Question: " + questionItem);
    if(!questionsLog.includes(questionItem)) {
        questionsLog.push(questionItem);
    }
}

async function populateQuestionsLogArray() {
    DebugA("populate Question Log array");
    const response = await fetch('/api/questionsLog');
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
    difficulty = await fetch("/api/difficulty");
    difficulty = await difficulty.json();
    const difficultyDisplay = document.getElementById("difficulty-display");
    difficultyDisplay.textContent = "Difficulty: " + difficulty;
    difficultyDisplay.setAttribute("class",difficulty);
    DebugA("word dif set to " + difficulty);
}

async function newWord() {
    const response = await fetch("https://random-word-api.vercel.app/api?words=1");
    let newWordResponse = await response.json();
    DebugA("New word to be set: " + newWordResponse);

    const responseSetWord = await fetch('/api/newWord', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(newWordResponse),
    });
}

async function getWord() {
    const response = await fetch('/api/word');
    currentWord = await response.json();
    // try {
        
    // } catch(error) {
    //     await newWord();
    //     currentWord = await response.json();
    //     console.log("catch");
    // }

    DebugA("current word retrieved: " + currentWord);
    if(currentWord.length > 7) {
        setWordDisplay("Hard");
    } else if(currentWord.length > 5) {
        setWordDisplay("Medium");
    } else {
        setWordDisplay("Easy");
    }

    //Take this out later
    newWord();
}

logIn();
populateQuestionsLogArray();
getWord();
// fakeUsers();