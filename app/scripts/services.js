'use strict';
angular.module('MusoList.services', [])

.service('loginService',['$state', '$firebaseAuth', function($state, $firebaseAuth) {
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
    authObj.$authWithPassword({
      email: username,
      password: password
    }).then(function(authData) {
      $state.go('tab.musos');
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  }

  this.logout = function(){
     $scope.auth.ref.unauth();    
  };


}])

.service('musoService', ['$firebase', function($firebase){
    var ref = new Firebase("https://glowing-inferno-2667.firebaseio.com/musos");
    var musos = $firebase(ref);

    this.getAll = function () {
      return musos.$asArray();
    };

    this.getMusoDetails = function(musoId){
      var array = musos.$asArray();
      return array.$getRecord(musoId);
    };
}])

.service('venueService', ['$firebase', function($firebase){
    var ref = new Firebase("https://glowing-inferno-2667.firebaseio.com/venues");
    var venues = $firebase(ref);

    this.getAll = function () {
      return venues.$asArray();
    };

    this.getVenueDetails = function(venueId){
      var array = venues.$asArray();
      return array.$getRecord(venueId);
    };
}])

.service('skillsService', ['$firebase', '$ionicModal', function($firebase, $ionicModal){
    var ref = new Firebase("https://glowing-inferno-2667.firebaseio.com/skills");
    var skills = $firebase(ref);
    // var modal;
    // $ionicModal.fromTemplateUrl('/templates/add-skill-modal.html', {
    //     scope: modal,
    //     animation: 'slide-in-up'
    //   }).then(function(modal) {
    //     modal.modal = modal;
    //   });
    //   this.openModal = function() {
    //     modal.modal.show();
    //   };
    //   this.closeModal = function() {
    //     modal.modal.hide();
    //   };

    this.getAll = function () {
      return skills.$asArray();
    };

}])
;
