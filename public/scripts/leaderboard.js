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
  console.log('render leaderboard')
  console.log(leaderboardResp)
  let str = '';
  leaderboardResp.items.forEach(item=>{
    str += (item.formattedScoreRank + ': ' + item.formattedScore + ' - ')
    str += (item.player.displayName)
    str += '<br />'
  })
  leaderboards.innerHTML = str;
}