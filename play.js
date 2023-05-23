let logFunctions = true;
function DebugA(logMessage) {
    if(logFunctions) {
        console.log(logMessage);
    }
}

function logIn(username) {
    DebugA("logIn");
    const loggedInText = document.getElementById("logged-in-element");
    loggedInText.innerHTML = "Logged in - " + username;
}





