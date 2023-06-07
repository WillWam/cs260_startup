const express = require('express');
const app = express();
const db = require('./database.js');
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
// Serve up the front-end static content hosting
app.use(express.static('public'));
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
  scores = db.getLeaderboard();
  res.send(scores);
});

// Get Previous Questions Log
apiRouter.get('/questionsLog', (_req, res) => {
  res.send(questionsLog);
});

// Get Current Word
apiRouter.get('/word', (_req, res) => {
  res.send(JSON.stringify(word));
});

// Get Current Difficulty
apiRouter.get('/difficulty', (_req, res) => {
  res.send(JSON.stringify(difficulty));
});

// Log In
apiRouter.get('/login', (_req, res) => {
  res.send(JSON.stringify(username));
});

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
  await db.addUser(usernameItem); 
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
    await db.addFinishedWord(finishedWordItem);
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

