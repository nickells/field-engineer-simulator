function renderPlayer(playerResp){
  playerDOM.innerHTML = 
    `Total XP: ${playerResp.experienceInfo.currentExperiencePoints} </br>
     Current Level: ${playerResp.experienceInfo.currentLevel.level} </br>
     XP until Next Level: ${playerResp.experienceInfo.currentLevel.maxExperiencePoints - playerResp.experienceInfo.currentExperiencePoints}`
}

function getPlayer(){
  let query = { playerId: 'me' }
  gapi.client.games.players.get(query)
  .execute(function(resp){
     renderPlayer(resp)
  })
}