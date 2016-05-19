let scoreModule = (function(){
  let score = 0;
  return {
    repair: function(){
      score++;
      this.renderScore(score)
      if (score % 5 === 0){ //achievements are only set on multiples of five, so we can do this to prevent rate limits
        achievementsModule.incrementAll();
        achievementsModule.findAchieved();
        playerModule.getPlayer();
      }
    },
    submitScore: function(){
      let query = {leaderboardId: constants.LEAD_BEST_ENGINEERS, score: score}
      gapi.client.games.scores.submit(query)
      .execute(function(resp){
        leaderboardModule.getLeaderboard();
      })
    },
    renderScore: function(score){
      domObject.scoreSpan.innerHTML = score;
    }   
  }
})();

