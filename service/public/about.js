function logIn() {
    playerUsername = localStorage.getItem("username");
    if(playerUsername === null) {
        playerUsername = "Anonymous";
    }
    const loggedInText = document.getElementById("logged-in-text");
    
    if(playerUsername != null && playerUsername !== "Anonymous") {
        loggedInText.innerHTML = "Logged in - " + playerUsername;
    } else {
        loggedInText.innerHTML = "Not Logged In (Anonymous)";
    }
}

logIn();