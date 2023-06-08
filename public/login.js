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
    const logOut = document.getElementById("already-signed-in");
    signUp.style.display = "block";
    login.style.display = "none";
    logOut.style.display = "none";
}

function pullUpLogin() {
    const signUp = document.getElementById("sign-up");
    const login = document.getElementById("login");
    const logOut = document.getElementById("already-signed-in");
    signUp.style.display = "none";
    login.style.display = "block";
    logOut.style.display = "none";
}

function pullUpLogOut() {
    const signUp = document.getElementById("sign-up");
    const login = document.getElementById("login");
    const logOut = document.getElementById("already-signed-in");
    signUp.style.display = "none";
    login.style.display = "none";
    logOut.style.display = "block";
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
    // const userRegex = new RegExp("^[A-Za-z][A-Za-z0-9_]{5,19}$");
    // if(userRegex.test(value)) {
    //     //Password valid :D
    //     passwordValid = true;
    // } else {
    //     //Password invalid :(
    //     passwordValid = false;
    // }

    passwordValid = true;

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

async function pressLogIn() {
    const username = document.querySelector('#username')?.value;
    const password = document.querySelector('#password')?.value;
    const response = await fetch(`/api/auth/login`, {
        method: 'post',
        body: JSON.stringify({ username: username, password: password }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
    });

    if (response.ok) {
        localStorage.setItem('username', username);
        window.location.href = 'play.html';
    } else {
        // const body = await response.json();
        // const modalEl = document.querySelector('#msgModal');
        // modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
        // const msgModal = new bootstrap.Modal(modalEl, {});
        // msgModal.show();
    }
}

async function pressSignUp() {
    const username = document.querySelector('#username-sign-up')?.value;
    const password = document.querySelector('#password-sign-up')?.value;
    const response = await fetch(`/api/auth/create`, {
        method: 'post',
        body: JSON.stringify({ username: username, password: password }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
    });

    if (response.ok) {
        localStorage.setItem('username', username);
        window.location.href = 'play.html';
    } else {
        // const body = await response.json();
        // const modalEl = document.querySelector('#msgModal');
        // modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
        // const msgModal = new bootstrap.Modal(modalEl, {});
        // msgModal.show();
    }
}

async function pressLogOut() {
    localStorage.removeItem('username');
    fetch(`/api/auth/logout`, {
        method: 'delete',
    }).then(() => (window.location.href = '/'));
}

function logIn() {
    let username = localStorage.getItem("username");
    const loggedInText = document.getElementById("logged-in-text");
    const loggedInLabel = document.getElementById("logged-in-label");

    if(username) {
        loggedInText.innerHTML = "Logged in - " + username;
        loggedInLabel.innerHTML = "Logged in - " + username;

        pullUpLogOut();
    } else {
        loggedInText.innerHTML = "Not Logged In";

        pullUpLogin();
    }
}

logIn();
