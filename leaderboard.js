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
    }
]

function addLeaderboardEntry(entry) {

}

function addAllLeaderboardEntries(entries) {
    entries.forEach((e) => {addLeaderboardEntry(e)});
}

function clearLeaderboard() {

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