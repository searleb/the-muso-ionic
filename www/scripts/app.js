'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('MusoList', ['ionic', 'config', 'MusoList.controllers', 'MusoList.services', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('login', {
      url:'/',
      templateUrl: 'templates/login.html',
      controller: 'UserCtrl'
    })
    // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:

    .state('tab.musos', {
      url: '/musos',
      views: {
        'tab-musos': {
          templateUrl: 'templates/tab-musos.html',
          controller: 'MusosCtrl'
        }
      }
    })
    .state('tab.muso-details', {
      url: '/muso/:musoId',
      views: {
        'tab-musos': {
          templateUrl: 'templates/muso-details.html',
          controller: 'MusoDetailsCtrl'
        }
      }
    })
    .state('tab.venues', {
      url: '/venues',
      views: {
        'tab-venues': {
          templateUrl: 'templates/tab-venues.html',
          controller: 'VenueCtrl'
        }
      }
    })
    .state('tab.venue-detail', {
      url: '/venue/:venueId',
      views: {
        'tab-venues': {
          templateUrl: 'templates/venue-details.html',
          controller: 'VenueDetailsCtrl'
        }
      }
    })
    .state('tab.manage', {
      url: '/manage',
      views: {
        'tab-manage': {
          templateUrl: 'templates/tab-manage.html',
          controller: 'ManageCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});

