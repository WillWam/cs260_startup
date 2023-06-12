const { MongoClient, MongoMissingCredentialsError } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');
const { diff } = require('semver');

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
    const result = await usersCollection.find();
    return result.toArray();
}

async function getQuestionsLog() {
    const result = await questionsCollection.find();
    return result.toArray();
}

async function clearQuestionsLog() {
    console.log("remove questions log");
    questionsCollection.deleteMany();
    return;
}

async function getFinishedWords() {
    const result = await wordsCollection.find();
    return result.toArray();
}

async function addFinishedWord(wordItem) {
    console.log("add finished word");
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

async function incrementScore(currentUsername, difficulty) {
    console.log("increase score " + currentUsername);
    let newScore;
    let newTotalScore;
    if(difficulty === "Easy") {
        let returnedUser = await usersCollection.findOne( {username: currentUsername} );
        newScore = returnedUser.easy + 1;
        if(isNaN(newScore)) {
            newScore = 1;
        }

        await usersCollection.updateOne( { username: currentUsername }, { $set: { easy: newScore } } ); 
    } else if(difficulty === "Medium") {
        let returnedUser = await usersCollection.findOne( {username: currentUsername} );
        newScore = returnedUser.medium + 1;
        if(isNaN(newScore)) {
            newScore = 1;
        }

        await usersCollection.updateOne( { username: currentUsername }, { $set: { medium: newScore } } ); 
    } else if(difficulty === "Hard") {
        let returnedUser = await usersCollection.findOne( {username: currentUsername} );
        newScore = returnedUser.hard + 1;
        if(isNaN(newScore)) {
            newScore = 1;
        }

        console.log("new score: " + newScore);
        await usersCollection.updateOne( { username: currentUsername }, { $set: { hard: newScore } } ); 
    }

    let returnedTotalUser = await usersCollection.findOne( {username: currentUsername} );
    if(isNaN(newTotalScore)) {
        newTotalScore = 0;
    }
    newTotalScore = returnedTotalUser.total + 1;
    if(newTotalScore !== (returnedTotalUser.easy + returnedTotalUser.medium + returnedTotalUser.hard)) {
        newTotalScore = returnedTotalUser.easy + returnedTotalUser.medium + returnedTotalUser.hard;
    }

    usersCollection.updateOne( { username: currentUsername }, { $set: { total: newTotalScore } } ); 
}

module.exports = {getLeaderboard, getFinishedWords, addFinishedWord, addUser, getUser, getUserByToken, createUser, addQuestion, getQuestionsLog, incrementScore, clearQuestionsLog};