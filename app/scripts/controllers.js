'use strict';
angular.module('MusoList.controllers', [])

.controller('UserCtrl', function($scope, $location, loginService){

    $scope.login = function(username, password){
    	loginService.login(username, password);	
    }; 

})

.controller('MusosCtrl', function($scope, musoService) {

	$scope.musos = musoService.getAll();
	
})

.controller('MusoDetailsCtrl', function($scope, $stateParams, musoService) {

	$scope.musoDetails = musoService.getMusoDetails($stateParams.musoId)

})

.controller('VenueCtrl', function($scope, venueService) {
	
	$scope.venues = venueService.getAll();
})

.controller('VenueDetailsCtrl', function($scope, $stateParams, venueService) {
  
  $scope.venueDetails = venueService.getVenueDetails($stateParams.venueId);

})

.controller('ManageCtrl', function($scope, skillsService) {

	$scope.skills = skillsService.getAll();

	// $scope.openModal = skillsService.openModal();

});
