//helpers
function getLeaderboard(type='PUBLIC'){
  let query = {leaderboardId: constants.LEAD_BEST_ENGINEERS, collection: type, timeSpan: 'ALL_TIME'}
  gapi.client.games.scores.list(query)
  .execute(function(resp){
    renderLeaderboard(resp)
  })
}

function changeLeaderboard(val){
  if (val==="0"){
    getLeaderboard('PUBLIC')
  }
  else{
    getLeaderboard('SOCIAL')
  }
}

function renderLeaderboard(leaderboardResp){
  let str = '';
  leaderboardResp.items.forEach(item=>{
    str += (item.formattedScoreRank + ': ' + item.formattedScore + ' - ')
    str += (item.player.name.givenName + ' ' + item.player.name.familyName)
    str += '<br />'
  })
  leaderboards.innerHTML = str;
}