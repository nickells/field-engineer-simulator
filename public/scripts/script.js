let score = 0;

//click handlers
function repair(){
  console.log('onclick')
  score++;
  renderScore(score)
  if (score % 5 === 0){ //achievements are only set on multiples of five, so we can do this to prevent rate limits
    incrementAll();
    findAchieved();
    getPlayer();
  }
}

function submitScore(){
  let query = {leaderboardId: constants.LEAD_BEST_ENGINEERS, score: score}
  gapi.client.games.scores.submit(query)
  .execute(function(resp){
    console.log(resp)
    getLeaderboard();
  })
}

function renderScore(score){
  scoreSpan.innerHTML = score;
}

