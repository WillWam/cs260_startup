let logFunctions = true;
function DebugA(logMessage) {
    if(logFunctions) {
        console.log(logMessage);
    }
}

let usernameValid = true;
let passwordValid = true;

function pullUpSignUp() {
    const signUp = document.getElementById("sign-up");
    const login = document.getElementById("login");
    signUp.style.display = "block";
    login.style.display = "none";
}

function pullUpLogin() {
    const signUp = document.getElementById("sign-up");
    const login = document.getElementById("login");
    signUp.style.display = "none";
    login.style.display = "block";
}

function checkLoginUsername(value) {
    DebugA("checkLoginUsername");
}

function checkLoginPassword(value) {
    DebugA("checkLoginUsername");
}

function checkSignUpUsername(value) {
    DebugA("checkSignUpUsername");
    const userRegex = new RegExp("^[A-Za-z][A-Za-z0-9_]{5,19}$");
    if(userRegex.test(value)) {
        //Username valid :D
        usernameValid = true;
    } else {
        //Username invalid :(
        usernameValid = false;
    }

    this.setButton();
}

function checkSignUpPassword(value) {
    DebugA("checkSignUpPassword");
    const userRegex = new RegExp("^[A-Za-z][A-Za-z0-9_]{5,19}$");
    if(userRegex.test(value)) {
        //Password valid :D
        passwordValid = true;
    } else {
        //Password invalid :(
        passwordValid = false;
    }

    this.setButton();
}

function setButton() {
    DebugA("setButton");
    const usernameSpecs = document.getElementById("username-specs");
    const usernameInput = document.getElementById("username-sign-up");
    const passwordSpecs = document.getElementById("password-specs");
    const passwordInput = document.getElementById("password-sign-up");
    const createAccountButton = document.getElementById("sign-up-button");
    const loginButton = document.getElementById("login-button");

    if(usernameValid && passwordValid) {
        createAccountButton.disabled = false;
    } else {
        createAccountButton.disabled = true;
    }

    if(usernameValid) {
        usernameSpecs.style.display = "none";
        usernameInput.style.boxShadow = "none";
    } else {
        usernameSpecs.style.display = "block";
        usernameInput.style.boxShadow = "0 0 7px red";
    }

    if(passwordValid) {
        passwordSpecs.style.display = "none";
        passwordInput.style.boxShadow = "none";
    } else {
        passwordSpecs.style.display = "block";
        passwordInput.style.boxShadow = "0 0 7px red";
    }
}


function pressLogIn() {
    DebugA("pressLogin")
    const usernameInput = document.getElementById("username");
    localStorage.setItem("username", usernameInput.value);

    window.location.href = "play.html";
}

function pressSignUp() {
    DebugA("pressSignUp");
    const usernameInput = document.getElementById("username-sign-up");
    localStorage.setItem("username", usernameInput.value);

    window.location.href = "play.html";
}

