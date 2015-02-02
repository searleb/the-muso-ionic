'use strict';
angular.module('MusoList.controllers', [])

.controller('UserCtrl', function($scope, $location, loginService){

    $scope.login = function(username, password){
    	loginService.login(username, password);	
    }; 

})

.controller('MusosCtrl', function($scope, musoService) {

	$scope.musos = musoService.getAll();
	console.log('musos',$scope.musos.length);
	
})

.controller('MusoDetailsCtrl', function($scope, $stateParams, musoService) {

	$scope.musoDetails = musoService.getMusoDetails($stateParams.musoId)

})

.controller('VenueCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('ManageCtrl', function($scope) {
});
