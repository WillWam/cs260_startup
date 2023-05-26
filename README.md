# Werecapone

### Elevator pitch

Remember the classic game "20 Questions"? What fun! But… it gets boring to play 20 questions with just you and a friend, or with just you and a computer. 
Werecapone is a real-time multiplayer word guessing game, where everyone in the world can play as the question-givers, all at the same time! Integrated with the ChatGPT API, the website will generate a word (could be a famous person, place, verb, adjective, concept/idea, etc.), and return the answer "yes", "no", or "maybe" to any question asked. When someone asks a question, the question and corresponding answer will be displayed to everyone else, and logged so that all players can work together to guess the word. As soon as the word is guessed, the player who guessed it gains points based on the difficulty of the word, and those points persist in the player's account for all to see in the leaderboard. Then, a new word is served up and the fun never stops!


### Login Page Design
![Mock](Login_Page_Mockup.jpg)

### Gameplay Page Design
![Mock](Gameplay_Page_Mockup.jpg)

### Leaderboard Page Design
![Mock](Leaderboard_Page_Mockup.jpg)

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
- **Login** - Register and login users. Credentials securely stored in database. Can't ask questions unless authenticated.
- **WebSocket** - In real time, when each user asks a question, their question will be displayed to other users.
- **React** - Application will use the React web framework.

## HTML deliverable

For this deliverable I added the application structure.

- **HTML pages** - Four HTML pages: Login, Playing the Game, Viewing the Leaderboard, About.
- **Links** - Each of the 4 pages links to all others.
- **Text** - Instructions for how to play, description about the game, leaderboard/username statistics, and questions/answers log are all represented with text.
- **Images** - There is a robot image representing the AI in gameplay, and checkmarks and x's indicating yes/no answers.
- **Login** - Input boxes for username and password and submit button for login.
- **Database** - The previous questions asked and answered represent data pulled from the database.
- **WebSocket** - The realtime count of users and their usernames represents data from the websocket.

## CSS deliverable

For this deliverable I properly styled the application into its final appearance.

- **Header, footer, and main content body**
- **Navigation elements** - I made a button group along the top and styled it with a primary color for the selected page and a brighter color when hovered over.
- **Responsive to window resizing** - All portions of the app fit the screen size using flex and changing width properties.
- **Application elements** - Elements are spaced out nicely from each other, with nice looking borders and most content contained within separate panels.
- **Application text content** - Consistent fonts are used (one for headers, and one for normal text) across all pages. Colors are also consistent.
- **Application images** - There aren't many images, but the ones that there are are well sized and fit the color scheme.

## Javascript deliverable

For this deliverable I added javascript to all 4 pages to add functonality

- **Header, footer, and main content body**
- **Login Components** - There's regex on signup for username and password, and the local storage holds whatever username you enter and uses it to display data 
- **Application elements** - Elements get created and added to the DOM to represent question logs and leaderboard entries.
- **Application text content** - Text in several different panels is updated dynamically based on number of active players, and words guessed previously
