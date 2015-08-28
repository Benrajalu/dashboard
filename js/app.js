
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
.directive('article', function () {       
    return {
        restrict: 'A',
    	templateUrl: 'content.html'
    };
})
.controller('Main', function($scope, $rootScope, $http, $stateParams, $timeout) {

})
