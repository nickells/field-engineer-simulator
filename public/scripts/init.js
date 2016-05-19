'use strict';

document.getElementById('clientId').content = settings.clientId;

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  domObject.name.innerHTML = 'You are ' + profile.getName();
  loadApi();
}

function loadApi(){
  gapi.client.load('games','v1',function(response) {
    console.log('api ready')
    leaderboardModule.getLeaderboard()
    achievementsModule.getAchievements()
    playerModule.getPlayer();
    achievementsModule.unlockAchievement(constants.ACH_YOU_DID_IT)
  });
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    domObject.name.innerHTML = 'You are signed out';
  });
}