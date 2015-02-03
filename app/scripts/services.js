'use strict';
angular.module('MusoList.services', [])

.service('loginService',['$state', function($state) {
  var loginAuth = {};

  // $rootScope.$on("$locationChangeStart", function() {
  //     // Create a callback which logs the current auth state
  //     function authDataCallback(authData) {
  //       if (authData) {
  //         console.log("User " + authData.uid + " is logged in with " + authData.provider);
  //         $location.path('/comment');
  //       } else {
  //         console.log("User is logged out");
  //         $location.path('/');
  //       }
  //     }
  //     // Register the callback to be fired every time auth state changes
  //     $scope.auth.ref = new Firebase("https://base-agents.firebaseio.com");
  //     $scope.auth.ref.onAuth(authDataCallback);
  // });

  this.logout = function(){
     $scope.auth.ref.unauth();    
  };

  this.login = function(username, password){
    console.log('login from service', username, password);
      loginAuth.ref = new Firebase("https://glowing-inferno-2667.firebaseio.com");
      loginAuth.ref.authWithPassword({
        email    : username,
        password : password
      }, function(error, authData) {
        if (error) {
          alert(error)
        } else {
          console.log("Authenticated successfully with payload:", authData);
          $state.go('tab.musos');
        }
      });
  }

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
}]);;
