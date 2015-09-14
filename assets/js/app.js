
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
      templateUrl: './views/login.html', 
      controller: 'login'
    })
    .state('dashboard', {
      url: "/",
      templateUrl: './views/dashboard.html', 
      controller: 'Main'
    })
    .state('pages', {
      url: "/pages.html",
      templateUrl: './views/pages.html', 
      controller: 'Main'
    })
    .state('articles', {
      url: "/articles.html",
      templateUrl: './views/articles.html', 
      controller: 'Main'
    })
    .state('404', {
      url: "/404.html",
      templateUrl: './views/pages.html', 
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
    	  templateUrl: './elements/topnav.html',
        controller: 'topNav', 
        controllerAs: 'topNav'
    };
})
.directive('statCard', function () {       
    return {
        restrict: 'A',
        templateUrl: './elements/stat-card.html',
        scope:{
          stat : "=stat"
        }
    };
})
.directive('visitChart', function(){
  return {
    restrict : 'AE', 
    templateUrl: './elements/visits-chart.html', 
    controller: 'visitsCtrl'
  };
})
.controller('Main', function($scope, $rootScope, $http, $stateParams, $timeout, $state, $cookies) {
  // Redirect to logiin if not logged in
    $rootScope.login = $cookies.get('login');
    if($rootScope.login != 'true'){
      $state.go('login', {}, {reload: true});
    }

  // Get pages data
    $http.get('./data/pages.json').success(function(data){
      $scope.pages = data;
    });

  // Get articles data
    $http.get('./data/articles.json').success(function(data){
      $scope.articles = data;
    });

})
.controller('nopeCtrl', function($scope, $rootScope, $http, $stateParams, $timeout) {
  console.log('oups');
});
