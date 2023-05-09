# Werecapone

### Elevator pitch

Remember the classic game "20 Questions"? What fun! But… it gets boring to play 20 questions with just you and a friend, or with just you and a computer. 
Werecapone is a real-time multiplayer word guessing game, where everyone in the world can play as the question-givers, all at the same time! Integrated with the ChatGPT API, the website will generate a word (could be a famous person, place, verb, adjective, concept/idea, etc.), and return the answer "yes", "no", or "maybe" to any question asked. When someone asks a question, the question and corresponding answer will be displayed to everyone else, and logged so that all players can work together to guess the word. As soon as the word is guessed, the player who guessed it gains points based on the difficulty of the word, and those points persist in the player's account for all to see in the leaderboard. Then, a new word is served up and the fun never stops!


### Layout Design

![Mock](blank.jpg)

### Key features

- Secure login with username/password over HTTPS
- Ability to type in and submit a question
- Display of the answer received
- Ability to see all previous answers for questions asked
- Leaderboard section with top player scores (persistently stored)

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - There will be three HTML pages: one for login, one for playing the game (submit questions / see answers), and one for viewing the leaderboard.
- **CSS** - The app will follow a visually appealing color theme, and all input and other components will be styled to be accessible for different screen sizes.
- **JavaScript** - Provides login, submitting questions, receiving answers from the API, display other users' questions/answers
- **Service** - Backend service with endpoints for:
  - login
  - retrieving questions/answers
  - retrieving point value per player
- **DB** - Store users, questions, answers, point scores in database.
- **Login** - Register and login users. Credentials securely stored in database. Can't vote unless authenticated.
- **WebSocket** - In real time, when each user asks a question, their question will be displayed to other users.
- **React** - Application ported to use the React web framework.
