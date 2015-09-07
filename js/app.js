
angular.module('app', ['ngSanitize', 'ngAnimate', 'ui.router', 'ngCookies'])
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  //
  // For any unmatched url, redirect to /state1
  //$locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise("/login.html");
  //
  // Now set up the states
  $stateProvider
  .state('login', {
      url: "/login.html",
      templateUrl: './elements/login.html', 
      controller: 'login'
    })
    .state('dashboard', {
      url: "/",
      templateUrl: './elements/dashboard.html', 
      controller: 'Main'
    })
    .state('pages', {
      url: "/pages.html",
      templateUrl: './elements/pages.html', 
      controller: 'Main'
    })
    .state('404', {
      url: "/404.html",
      templateUrl: './elements/pages.html', 
      controller: 'nopeCtrl'
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
.controller('Main', function($scope, $rootScope, $http, $stateParams, $timeout, $state, $cookies) {
  $rootScope.login = $cookies.get('login');
  if($rootScope.login != 'true'){
    $state.go('login', {}, {reload: true});
  }
})
.controller('nopeCtrl', function($scope, $rootScope, $http, $stateParams, $timeout) {
  console.log('oups');
});
