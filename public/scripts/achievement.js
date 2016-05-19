let achievementsModule = (function(){
  let unlockedAchievements = {};

  return {
    getAchievements: function(){
      gapi.client.games.achievementDefinitions.list()
      .execute(function(resp){
        this.renderAchievements(resp)
        this.findAchieved()
      }.bind(this))
    },
    findAchieved: function(){
      gapi.client.games.achievements.list({playerId: 'me'})
      .execute(function(resp){
        resp.items.forEach(function(item){
          if (item.achievementState === 'UNLOCKED'){
            unlockedAchievements[item.id] = true;
            document.getElementById(item.id).style.color = 'red'
          }
          else {
            unlockedAchievements[item.id] = null;
            document.getElementById(item.id).style.color = 'lightgrey'
          }
        })
      })
    },
    unlockAchievement: function(id){
      let query = {achievementId: id}
      gapi.client.games.achievements.unlock(query)
      .execute(function(resp){
        this.getAchievements();
      }.bind(this))
    },
    incrementAll: function(){
      let achievements = [
        constants.ACH_YOURE_PRETTY_GOOD_AT_THIS,
        constants.ACH_NICE_JOB_TODAY,
        constants.ACH_AMAZING,
        constants.ACH_YOURE_THE_BEST_ENGINEER
      ];
      achievements.forEach(function(achievement){
        if (!unlockedAchievements[achievement]){
          this.incrementAchievement(achievement)
        }
      }.bind(this))
    },
    incrementAchievement: function(id){
      let query = {achievementId: id, stepsToIncrement: 5}
      try {
        gapi.client.games.achievements.increment(query)
        .execute(function(resp){
          if (resp.newlyUnlocked){
            this.findAchieved();
          }
        }.bind(this))
      }
      catch(err){
        console.log('error!',err)
      }
    },
    resetAchievements: function(){
      let query = {};
      query.path = 'games/v1management/achievements/reset'
      query.method = 'POST'
      gapi.client.request(query)
      .then(function(resp){
        this.findAchieved()
      }.bind(this))
    },
    renderAchievements: function(achievementsResp){
      let str = '';
      achievementsResp.items.forEach(item=>{
        str += 
          `<div id=${item.id} style="color: lightgrey"}>
            ${item.name} : ${item.description}
          </div>`
      })
      achievements.innerHTML = str;
    }
  }
})();