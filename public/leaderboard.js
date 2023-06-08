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
    newWords.innerHTML = Number(entry.total);
    newRow.appendChild(newWords);
    const newEasy = tdTemplate.cloneNode(true);
    newEasy.setAttribute("class", "leaderboard-easy");
    newEasy.innerHTML = entry.easy;
    newRow.appendChild(newEasy);
    const newMedium = tdTemplate.cloneNode(true);
    newMedium.setAttribute("class", "leaderboard-medium");
    newMedium.innerHTML = entry.medium;
    newRow.appendChild(newMedium);
    const newHard = tdTemplate.cloneNode(true);
    newHard.setAttribute("class", "leaderboard-hard");
    newHard.innerHTML = entry.hard;
    newRow.appendChild(newHard);
    const newDate = tdTemplate.cloneNode(true);
    newDate.setAttribute("class", "leaderboard-date");
    let formattedDate = new Date(entry.joinDate).toLocaleDateString();
    newDate.innerHTML = formattedDate;
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


function logIn() {
    playerUsername = localStorage.getItem("username");
    const loggedInText = document.getElementById("logged-in-text");
    
    if(playerUsername != null) {
        loggedInText.innerHTML = "Logged in - " + playerUsername;
    } else {
        loggedInText.innerHTML = "Not Logged In";
    }
}

function delay(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, milliseconds);
    });
  }

async function fakeEntries() {
    let fakeEntries = [
        {
            username: "Test_username",
            totalWords: 25,
            easyWords: 6,
            mediumWords: 8,
            hardWords: 11,
            joinDate: "5/24/23"
        },
        {
            username: "Penguin_man47",
            totalWords: 25,
            easyWords: 6,
            mediumWords: 18,
            hardWords: 11,
            joinDate: "5/24/23"
        },
        {
            username: "ThebestUser",
            totalWords: 2,
            easyWords: 6,
            mediumWords: 8,
            hardWords: 11,
            joinDate: "5/24/23"
        },
    ]
    for(let i=0; i<3; i++) {
        await delay(300);
        leaderboardEntries.push(fakeEntries[i]);
        addAllLeaderboardEntries();
    }
}

async function populateLeaderboardEntries() {
    DebugA("populate leaderboard entries");
    const response = await fetch('/api/scores');
    leaderboardEntries = await response.json();
    DebugA("leaderboard entries: " + leaderboardEntries);
    addAllLeaderboardEntries();
}

logIn();
populateLeaderboardEntries();