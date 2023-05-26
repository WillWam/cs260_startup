let logFunctions = true;
function DebugA(logMessage) {
    if(logFunctions) {
        console.log(logMessage);
    }
}

let leaderboardEntries = [
    {
        username: "Test_username",
        totalWords: 25,
        easyWords: 6,
        mediumWords: 8,
        hardWords: 11,
        joinDate: "5/24/23"
    },
    
]

function addLeaderboardEntry(entry) {
    DebugA("add leaderboard entry: " + entry);

    const leaderboardTable = document.getElementById("leaderboard-table");
    const trTemplate = document.getElementById("template-tr");
    const tdTemplate = document.getElementById("template-td");

    const newRow = trTemplate.cloneNode(true);
    const newUsername = tdTemplate.cloneNode(true);
    newUsername.setAttribute("class", "leaderboard-username");
    newUsername.innerHTML = entry.username;
    newRow.appendChild(newUsername);
    const newWords = tdTemplate.cloneNode(true);
    newWords.setAttribute("class", "leaderboard-words");
    newWords.innerHTML = entry.totalWords;
    newRow.appendChild(newWords);
    const newEasy = tdTemplate.cloneNode(true);
    newEasy.setAttribute("class", "leaderboard-easy");
    newEasy.innerHTML = entry.easyWords;
    newRow.appendChild(newEasy);
    const newMedium = tdTemplate.cloneNode(true);
    newMedium.setAttribute("class", "leaderboard-medium");
    newMedium.innerHTML = entry.mediumWords;
    newRow.appendChild(newMedium);
    const newHard = tdTemplate.cloneNode(true);
    newHard.setAttribute("class", "leaderboard-hard");
    newHard.innerHTML = entry.hardWords;
    newRow.appendChild(newHard);
    const newDate = tdTemplate.cloneNode(true);
    newDate.setAttribute("class", "leaderboard-date");
    newDate.innerHTML = entry.joinDate;
    newRow.appendChild(newDate);
    

    console.log(newRow);
    leaderboardTable.appendChild(newRow);
}

function addAllLeaderboardEntries() {
    DebugA("addAll leaderboard entries");
    const leaderboardTable = document.getElementById("leaderboard-table");

    leaderboardTable.innerHTML = "";

    leaderboardEntries.forEach((entry) => addLeaderboardEntry(entry));
}

function populateLeaderboardEntries() {

}


function logIn() {
    playerUsername = localStorage.getItem("username");
    const loggedInText = document.getElementById("logged-in-text");
    
    if(playerUsername != null) {
        loggedInText.innerHTML = "Logged in - " + playerUsername;
    } else {
        loggedInText.innerHTML = "Not Logged In";
    }
}

logIn();
addAllLeaderboardEntries();