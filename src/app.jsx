import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div className='body bg-dark text-light'>
      <header>
            <h1>Werecapone</h1>
            <div id="nav-div">
                <button onClick="parent.location='index.html'" class="button-active">Login</button>
                <button onClick="parent.location='play.html'" class="button">Play</button>
                <button onClick="parent.location='leaderboard.html'" class="button">Leaderboard</button>
                <button onClick="parent.location='about.html'" class="button">About</button>
            </div>
            <section class="shadow"></section>
      </header>

      <main>App components go here</main>

      
      <footer>
            <p id="logged-in-text">Not Logged In</p>
            <p>Will Clayton</p> {/* style="margin-left: auto;" */}
            <a href="https://github.com/WillWam/startup">GitHub</a>
        </footer>
    </div>
  )
}