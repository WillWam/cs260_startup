import React from 'react';

import './leaderboard.css';

export function Leaderboard() {
  let [leaderboardEntries, setScores] = React.useState([]);

  


  return (
    <main>
            <h2 id="leaderboard-header">Top Word Guessers</h2>
            <div class="panel" id="leaderboard-panel">
            <table id="top-table">
                <tr id="top-row">
                    <th class="leaderboard-username">Username</th>
                    <th class="leaderboard-words">Total</th>
                    <th class="leaderboard-easy">Easy</th>
                    <th class="leaderboard-medium">Medium</th>
                    <th class="leaderboard-hard">Hard</th>
                    <th class="leaderboard-date">Join Date</th>
                </tr>
                </table>

                <div id="scroll-table">

                <table>
                    <tr  id="template-tr"></tr>
                    <td  id="template-td" class="leaderboard-username"></td>
                </table>

                <table id="leaderboard-table">
                
                
                
                
                
                
            </table>
            </div>
            </div>
        </main>
  );
}
