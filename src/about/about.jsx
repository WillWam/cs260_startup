import React from 'react';
import './about.css';

export function About(props) {
  return (
    <main>
            <h2 id="leaderboard-header">What is Werecapone?</h2>
            <div class="panel" id="about-panel">
                <p id="about-text">Werecapone is a real-time multiplayer word 
                guessing game, where everyone in the world 
                can play as the question-givers, all at the 
                same time! Integrated with the ChatGPT API, 
                the website will generate a word (could be 
                a famous person, place, verb, adjective, 
                concept/idea, etc.), and return the answer 
                "yes", "no", or "maybe" to any question 
                asked. When someone asks a question, the 
                question and corresponding answer will be 
                displayed to everyone else, and logged so 
                that all players can work together to guess 
                the word. As soon as the word is guessed, the 
                player who guessed it gains points based on 
                the difficulty of the word, and those points 
                persist in the player's account for all to see 
                in the leaderboard. Then, a new word is served 
                up and the fun never stops!
                </p>
            </div>
        </main>
  );
}
