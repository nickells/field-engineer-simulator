'use strict'
let leaderboardModule = {
  getLeaderboard: function(type='PUBLIC'){
    let query = {leaderboardId: constants.LEAD_BEST_ENGINEERS, collection: type, timeSpan: 'ALL_TIME'}
    gapi.client.games.scores.list(query)
    .execute(function(resp){
      this.renderLeaderboard(resp)
    }.bind(this))
  },
  changeLeaderboard: function(val){
    if (val==="0"){
      this.getLeaderboard('PUBLIC')
    }
    else{
      this.getLeaderboard('SOCIAL')
    }
  },
  renderLeaderboard: function(leaderboardResp){
    let str = '';
    leaderboardResp.items.forEach(item=>{
      str += (item.formattedScoreRank + ': ' + item.formattedScore + ' - ')
      str += (item.player.displayName)
      str += '<br />'
    })
    domObject.leaderboards.innerHTML = str;
  }
}