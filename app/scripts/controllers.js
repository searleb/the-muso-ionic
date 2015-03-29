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

})

.controller('MusoDetailsCtrl', function($scope, $stateParams, musoService, $ionicModal, $ionicActionSheet, $ionicPopup, skillsService, $cordovaSocialSharing) {
	$scope.muso = musoService.getMusoDetails($stateParams.musoId);
	$scope.skills = skillsService.getAll();
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

	  // sharing
	  $scope.share = function(){
	  	$cordovaSocialSharing.share("test message", "test title", null, 'http://billsearle.me');
	  }
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

})

.controller('VenueDetailsCtrl', function($scope, $stateParams, venueService, $ionicModal) {
  $scope.venue = venueService.getVenueDetails($stateParams.venueId);

  $scope.saveVenue = function(venue) {
  	console.log('cont', venue);
  	venueService.updateRecord(venue);
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

})

.controller('ManageCtrl', function($scope, loginService, $ionicModal, skillsService) {


	$scope.logout = function(){
		loginService.logout();
	};

	$scope.saveSkill = function(skill){
		skillsService.saveSkill(skill);
	};

	$scope.skills = skillsService.getAll();

	$ionicModal.fromTemplateUrl('templates/modals/add-skill.html', {
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

});
