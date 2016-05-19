let playerModule = {
  renderPlayer: function(playerResp){
    domObject.playerDOM.innerHTML = 
      `Total XP: ${playerResp.experienceInfo.currentExperiencePoints} </br>
       Current Level: ${playerResp.experienceInfo.currentLevel.level} </br>
       XP until Next Level: ${playerResp.experienceInfo.currentLevel.maxExperiencePoints - playerResp.experienceInfo.currentExperiencePoints}`
  },
  getPlayer: function(){
    let query = { playerId: 'me' }
    gapi.client.games.players.get(query)
    .execute(function(resp){
       this.renderPlayer(resp)
    }.bind(this))
  }
}
