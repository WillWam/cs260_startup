const { MongoClient, MongoMissingCredentialsError } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
// const url = `mongodb+srv://werecapone:Werecapone100%@cluster0.ccakuej.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url);
const db = client.db('werecapone');
const scoreCollection = db.collection('score');
const usersCollection = db.collection('users');
const wordsCollection = db.collection('words');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function getLeaderboard() {
    const query = { score: { $gt: 0, $lt: 20000 } };
    const options = {
        sort: { score: -1 },
        limit: 1000,
    };
    const result = usersCollection.find(query, options);
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

// async function addScore(score) {
//   const result = await scoreCollection.insertOne(score);
//   return result;
// }

// function getHighScores() {
//   const query = { score: { $gt: 0, $lt: 900 } };
//   const options = {
//     sort: { score: -1 },
//     limit: 10,
//   };
//   const cursor = scoreCollection.find(query, options);
//   return cursor.toArray();
// }

// module.exports = { addScore, getHighScores };

module.exports = {getLeaderboard, getFinishedWords, addFinishedWord, addUser};