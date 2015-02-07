'use strict';
angular.module('MusoList.services', [])

.service('loginService',['$state', '$firebaseAuth', '$ionicLoading', function($state, $firebaseAuth, $ionicLoading) {
  // sets up a firebase object for use with $firebaseAuth (think jQuery objects)
  var ref = new Firebase("https://glowing-inferno-2667.firebaseio.com");
  var authObj = $firebaseAuth(ref);
  // gets current auth state
  var authData = authObj.$getAuth();
  // redirect from login page if user is already logged in
  if (authData) {
    $state.go('tab.musos');
  } else {
    console.log("Logged out");
  }

  this.login = function(username, password){
    
    $ionicLoading.show({
      template: 'Logging in...'
    });

    authObj.$authWithPassword({
      email: username,
      password: password
    }).then(function(authData) {
      $state.go('tab.musos');
      $ionicLoading.hide();
    }).catch(function(error) {
      console.error("Authentication failed:", error);
      $ionicLoading.hide();
      alert("Login failed, please try again.");
    });
  }

  this.logout = function(){
   authObj.$unauth();
   $state.go('login');
 };


}])

.service('musoService', ['$firebase', function($firebase){
  var ref = new Firebase("https://glowing-inferno-2667.firebaseio.com/musos");
  var musos = $firebase(ref).$asArray();

  this.getAll = function () {
    return musos;
  };

  this.getMusoDetails = function(musoId){
    return musos.$getRecord(musoId);
  };

  this.saveMuso = function(muso){
    musos.$add(muso);
  };
}])

.service('venueService', ['$firebase', function($firebase){
  var ref = new Firebase("https://glowing-inferno-2667.firebaseio.com/venues");
  var venues = $firebase(ref).$asArray();

  this.getAll = function () {
    return venues;
  };

  this.getVenueDetails = function(venueId){
    return venues.$getRecord(venueId);
  };

  this.saveVenue = function(venue){
    venues.$add(venue);
  }
}])

.service('skillsService', ['$firebase', '$ionicModal', function($firebase){
  var ref = new Firebase("https://glowing-inferno-2667.firebaseio.com/skills");
  var skills = $firebase(ref);
  var skillsArray = skills.$asArray();

    this.getAll = function () {
      return skills.$asObject();
    };

    this.saveSkill = function(skill){      
      skillsArray.$add(skill).then(function(ref){
        alert(skill + ' was saved sucessfully');
      });
    };

  }])
;
