const express = require('express');
const app = express();
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

// Get Scores
apiRouter.get('/scores', (_req, res) => {
  res.send(scores);
});

// Get Previous Questions Log
apiRouter.get('/questionsLog', (_req, res) => {
  res.send(questionsLog);
});

// Get Current Word
apiRouter.get('/word', (_req, res) => {
  res.send(word);
});

// Guess the word
apiRouter.post('/guessWord', (req, res) => {
  let wordCorrectStatus = guessWord(req.body);
  res.send(wordCorrectStatus);
});

// SubmitScore
apiRouter.post('/score', (req, res) => {
  updateScores(req.body, scores);
  res.send(scores);
});

// Set Word
apiRouter.post('/word', (req, res) => {
  setWord(req.body);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// The high scores are saved in memory and disappear whenever the service is restarted.
let scores = [];
let previousWords = [];
let questionsLog = [];
let word = "";

// async function setWord() {
//   const response = await openai.createCompletion({
//     model: "text-davinci-003",
//     prompt: "Say this is a test",
//     max_tokens: 7,
//     temperature: 0,
//   });
//   word = await response.json();
// }

function setWord(newWord) {
  word = newWord;
}

function updateScores(newScore) {
  var index = peoples.findIndex(p => p.attr1 == "john");
}


