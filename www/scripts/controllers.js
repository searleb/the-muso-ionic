'use strict';
angular.module('MusoList.controllers', ["checklist-model"])

.controller('UserCtrl', function($scope, $location, loginService){
    $scope.login = function(username, password){
    	loginService.login(username, password);	
    }; 
})

.controller('MusosCtrl', function($scope, musoService, $ionicModal, skillsService) {
	$scope.musos = musoService.getAll();

	$scope.saveMuso = function(muso){
		musoService.saveMuso(muso);
	};

	$scope.skills = skillsService.getAll();

	$scope.saveSkill = function(skill){
		skillsService.saveSkill(skill);
	};

	$ionicModal.fromTemplateUrl('templates/modals/add-muso.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
	  }).then(function(modal) {
	    $scope.modal = modal;
	  });
	  $scope.openModal = function() {
	    $scope.modal.show();
	  };
	  $scope.closeModal = function() {
	    $scope.modal.hide();
	  };
	  //Cleanup the modal when we're done with it!
	  $scope.$on('$destroy', function() {
	    $scope.modal.remove();
	  });
	  // Execute action on hide modal
	  $scope.$on('modal.hidden', function() {
	    // Execute action
	  });
	  // Execute action on remove modal
	  $scope.$on('modal.removed', function() {
	    // Execute action
	  });

})

.controller('MusoDetailsCtrl', function($scope, $stateParams, musoService, $ionicModal, $ionicActionSheet, $ionicPopup) {
	$scope.muso = musoService.getMusoDetails($stateParams.musoId);
	console.log($scope.muso);

	$scope.saveMuso = function(muso) {
		console.log('cont', muso);
		musoService.updateRecord(muso);
	};

	$scope.deleteMuso = function(muso) {
		musoService.deleteRecord(muso);
	};

	$scope.showActionSheet = function() {
		  // Show the action sheet
		  var hideSheet = $ionicActionSheet.show({
		    buttons: [
		      { text: 'Edit' }
		    ],
		    destructiveText: 'Delete',
		    cancelText: 'Cancel',
		    cancel: function() {
		         // add cancel code..
		       },
		    buttonClicked: function() {
		    	$scope.openModal();
		      	return true;
		    },
		    destructiveButtonClicked: function() {
		    	$scope.showConfirm();
		    	return true;
		    }
		});
	}

	$ionicModal.fromTemplateUrl('templates/modals/add-muso.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
	  }).then(function(modal) {
	    $scope.modal = modal;
	  });
	  $scope.openModal = function() {
	    $scope.modal.show();
	  };
	  $scope.closeModal = function() {
	    $scope.modal.hide();
	  };
	  //Cleanup the modal when we're done with it!
	  $scope.$on('$destroy', function() {
	    $scope.modal.remove();
	  });

	  // A confirm dialog
	  $scope.showConfirm = function() {
	    var confirmPopup = $ionicPopup.confirm({
	      title: 'Delete?',
	      template: 'Are you sure you want to delete {{muso.firstName}}'
	    });
	    confirmPopup.then(function(res) {
	      if(res) {
	      	$scope.deleteMuso($scope.muso);
	      } else {
	        console.log('You are not sure');
	      }
	    });
	  };
})


.controller('VenueCtrl', function($scope, venueService, $ionicModal) {
	$scope.venues = venueService.getAll();

	$scope.saveVenue = function(venue){
		venueService.saveVenue(venue);
	};

	$ionicModal.fromTemplateUrl('templates/modals/add-venue.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
	  }).then(function(modal) {
	    $scope.modal = modal;
	  });
	  $scope.openModal = function() {
	    $scope.modal.show();
	  };
	  $scope.closeModal = function() {
	    $scope.modal.hide();
	  };
	  //Cleanup the modal when we're done with it!
	  $scope.$on('$destroy', function() {
	    $scope.modal.remove();
	  });
	  // Execute action on hide modal
	  $scope.$on('modal.hidden', function() {
	    // Execute action
	  });
	  // Execute action on remove modal
	  $scope.$on('modal.removed', function() {
	    // Execute action
	  });
})

.controller('VenueDetailsCtrl', function($scope, $stateParams, venueService) {
  $scope.venueDetails = venueService.getVenueDetails($stateParams.venueId);
})

.controller('ManageCtrl', function($scope, loginService, $ionicSlideBoxDelegate) {


	$scope.logout = function(){
		loginService.logout();
	};



});
