import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Leaderboard } from './leaderboard/leaderboard';
import { About } from './about/about';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';




function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  return (
    <BrowserRouter>
      <div className='body bg-dark text-light'>
      <header>
            <h1>Werecapone</h1>
            <div id="nav-div">
                <button onClick="parent.location='index.html'" class="button-active">
                  <NavLink className='nav-link' to=''>
                  Login
                  </NavLink>
                </button>
                <button onClick="parent.location='play.html'" class="button">
                <NavLink className='nav-link' to='play'>
                  Play
                </NavLink>
                </button>
                <button onClick="parent.location='leaderboard.html'" class="button">
                <NavLink className='nav-link' to='leaderboard'>
                  Leaderboard
                </NavLink>
                </button>
                <button onClick="parent.location='about.html'" class="button">
                <NavLink className='nav-link' to='about'>
                  About
                </NavLink>
                </button>
            </div>
            <section class="shadow"></section>
        </header>

        <Routes>
          <Route
            path='/'
            element={
              <Login
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}
              />
            }
            exact
          />
          <Route path='/play' element={<Play userName={userName} />} />
          <Route path='/leaderboard' element={<Leaderboard/>} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer>
            <p id="logged-in-text">Not Logged In</p>
            <p>Will Clayton</p> {/* style="margin-left: auto;" */}
            <a href="https://github.com/WillWam/startup">GitHub</a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;
