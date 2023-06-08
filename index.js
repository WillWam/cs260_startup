
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

// import fetch from "node-fetch";

// import { Configuration, OpenAIApi } from "openai";
// const configuration = new Configuration({
//     organization: "org-3dC7MN6e5XpOgNYTPXzybZZ2",
//     // apiKey: process.env.OPENAI_API_KEY,
//     apiKey: "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",
// });
// const openai = new OpenAIApi(configuration);

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;
// JSON body parsing using built-in middleware
app.use(express.json());
// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());
// Serve up the front-end static content hosting
app.use(express.static('public'));
// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);
// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);
// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});
//Say port details
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


// Get Scores
apiRouter.get('/scores', (_req, res) => {
  scores = DB.getLeaderboard();
  res.send(scores);
});

// Get Previous Questions Log
apiRouter.get('/questionsLog', (_req, res) => {
  res.send(questionsLog);
});

// Get Current Word
apiRouter.get('/word', (_req, res) => {
  console.log("get word");
  res.send(JSON.stringify(word));
});

// Get Current Difficulty
apiRouter.get('/difficulty', (_req, res) => {
  res.send(JSON.stringify(difficulty));
});

// // Log In
// apiRouter.get('/login', (_req, res) => {
//   res.send(JSON.stringify(username));
// });

// Sign Up
apiRouter.post('/signUp', async (req, res) => {
  console.log("adding user " + req.body);
  let usernameItem = {
    username: req.body,
    password: "umm none",
    joinDate: new Date(Date.now()),
    easy: 0,
    medium: 0,
    hard: 0
  }
  await DB.addUser(usernameItem); 
  res.send(usernameItem);
});

// Guess the word
apiRouter.post('/guessWord', (req, res) => {
  let wordCorrectStatus = guessWord(req.body);
  res.send(wordCorrectStatus);
});

// Set New Word
apiRouter.post('/newWord', async (req, res) => {
  let newWord = await setNewWord();
  res.send(newWord);
});

// Ask Question
apiRouter.post('/askQuestion', async (req, res) => {
  answer = await askQuestion(req.body);
  res.send(answer);
});

// SubmitScore
apiRouter.post('/score', (req, res) => {
  updateScores(req.body, scores);
  res.send(scores);
});

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.username)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.username, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// GetUser returns information about a user
apiRouter.get('/user/:username', async (req, res) => {
  const user = await DB.getUser(req.params.username);
  if (user) {
    const token = req?.cookies.token;
    res.send({ username: user.username, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});

// secureApiRouter verifies credentials for endpoints
let secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// The high scores are saved in memory and disappear whenever the service is restarted.
let scores = [];
let users = [];
let previousWords = [];
let questionsLog = [];
let word = "tempWord";
let difficulty = "Hard";
let wordStartDate = new Date(Date.now());
let username = "TempUsername";

// async function setWord() {
//   const response = await openai.createCompletion({
//     model: "text-davinci-003",
//     prompt: "Say this is a test",
//     max_tokens: 7,
//     temperature: 0,
//   });
//   word = await response.json();
// }

async function setNewWord(newWord) {
  // const response = await fetch("https://random-word-api.vercel.app/api?words=1");
  // word = await response.json();

  if(word.length > 7) {
    difficulty = "Hard";
  } else if(word.length > 5) {
    difficulty = "Medium";
  } else {
    difficulty = "Easy";
  }

  questionsLog = [];
  
  console.log("word set to " + word + " and dif " + difficulty);
}

function updateScores(newScore) {
  var index = peoples.findIndex(p => p.attr1 == "john");
}

async function askQuestion(questionItem) {
  answerItem = questionItem;
  console.log(answerItem.question + ", " + word + ", " + answerItem.question.toLowerCase().includes(word.toLowerCase()));

  //Check for correct word Guess
  if(answerItem.question.toLowerCase().includes(word.toLowerCase())) {
    console.log("correct word guessed: " + word);
    answerItem.answer = "correct";
    answerItem.question = answerItem.username + " guessed the word: " + word + "!";
    let finishedWordItem = {
      word: word,
      difficulty: difficulty,
      guessedBy: answerItem.username,
      startDate: wordStartDate,
      endDate: new Date(Date.now()),
      questions: questionsLog
    }
    await DB.addFinishedWord(finishedWordItem);
    setNewWord();
    return answerItem;
  }

  //Check for invalid question
  let validQuestion = true;
  if(validQuestion === false) {
    answerItem.answer = "invalid";
    return answerItem;
  }

  //Answer the Question normally
  answerItem.answer = "yes";
  if(Math.random() < 0.33) {
      answerItem.answer = "no";
  } else if (Math.random() < 0.5) {
      answerItem.answer = "maybe";
  }

  questionsLog.push(answerItem);
  return answerItem;
}

// function guessWord(rawWordGuess) {
//   wordGuess = rawWordGuess.trim().toLowerCase();
//   if(wordGuess === word) {
//     return true;
//   } else {
//     return false;
//   }
// }

