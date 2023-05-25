function logIn() {
    playerUsername = localStorage.getItem("username");
    const loggedInText = document.getElementById("logged-in-text");
    loggedInText.innerHTML = "Logged in - " + playerUsername;
}

logIn();