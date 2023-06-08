const { MongoClient, MongoMissingCredentialsError } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('werecapone');
const scoreCollection = db.collection('score');
const usersCollection = db.collection('users');
const wordsCollection = db.collection('words');
const questionsCollection = db.collection('questions');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(username) {
    return usersCollection.findOne({ username: username });
  }
  
  function getUserByToken(token) {
    return usersCollection.findOne({ token: token });
  }
  
  async function createUser(username, password) {
    // Hash the password before we insert it into the database
    const passwordHash = await bcrypt.hash(password, 10);
  
    const user = {
        username: username,
        password: passwordHash,
        token: uuid.v4(),
        joinDate: new Date(Date.now()),
        easy: 0,
        medium: 0,
        hard: 0,
        total: 0,
    };
    await usersCollection.insertOne(user);
  
    return user;
  }

async function getLeaderboard() {
    const query = { score: { $gt: 0, $lt: 20000 } };
    const options = {
        sort: { score: -1 },
        limit: 1000,
    };
    const result = usersCollection.find();
    return result.toArray();
}

async function getQuestionsLog() {
    const result = questionsCollection.find();
    return result.toArray();
}

async function getFinishedWords() {
    const result = wordsCollection.find();
    return result.toArray();
}

async function addFinishedWord(wordItem) {
    const result = await wordsCollection.insertOne(wordItem);
    return result;
}

async function addUser(usernameItem) {
    const result = await usersCollection.insertOne(usernameItem);
    return result;
}

async function addQuestion(questionItem) {
    const result = await questionsCollection.insertOne(questionItem);
    return result;
}

module.exports = {getLeaderboard, getFinishedWords, addFinishedWord, addUser, getUser, getUserByToken, createUser, addQuestion, getQuestionsLog};