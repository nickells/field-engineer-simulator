'use strict';

document.getElementById('clientId').content = settings.clientId;

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  name.innerHTML = 'You are ' + profile.getName();
  loadApi();
}

function loadApi(){
  console.log('loading api')
  gapi.client.load('games','v1',function(response) {
    console.log('api ready')
    getLeaderboard()
    getAchievements()
    getPlayer();
    unlockAchievement(constants.ACH_YOU_DID_IT)
  });
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    name.innerHTML = 'You are signed out';
  });
}