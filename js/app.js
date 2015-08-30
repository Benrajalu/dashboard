
angular.module('app', ['ngSanitize', 'ngAnimate', 'ui.router'])
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  //
  // For any unmatched url, redirect to /state1
  //$locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('default', {
      url: "/",
      templateUrl: '../fragments/index.html', 
      controller: 'Main'
    })
})
.directive('loaded', function () {       
    return {
    	restrict: 'A',
        link: function(scope, element, attrs) {   
            element.bind("load" , function(event){ 
            	indexHeight();
				magicLineHeight();
				smartLine();
            });
        }
    }
})
.directive('topnav', function () {       
    return {
        restrict: 'A',
    	  templateUrl: 'elements/topnav.html',
        controller: 'topNav', 
        controllerAs: 'topNav'
    };
})
.controller('Main', function($scope, $rootScope, $http, $stateParams, $timeout) {

})
