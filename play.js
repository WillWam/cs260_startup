let logFunctions = true;
function DebugA(logMessage) {
    if(logFunctions) {
        console.log(logMessage);
    }
}

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

addAllActivePlayers();