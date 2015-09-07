
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
    .state('articles', {
      url: "/articles.html",
      templateUrl: './elements/articles.html', 
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
.directive('statCard', function () {       
    return {
        restrict: 'A',
        templateUrl: 'elements/stat-card.html',
        scope:{
          stat : "=stat"
        }
    };
})
.controller('Main', function($scope, $rootScope, $http, $stateParams, $timeout, $state, $cookies) {
  // Redirect to logiin if not logged in
    $rootScope.login = $cookies.get('login');
    if($rootScope.login != 'true'){
      $state.go('login', {}, {reload: true});
    }

  // Build the chart
  var makeChart = function(visits){
      var data = visits;
       
      var margin = {top: 20, right: 0, bottom: 30, left: 0},
          width = $('#visits').parent().width() - margin.left - margin.right,
          height = $('#visits').parent().height() - margin.top - margin.bottom;

      var parseDate = d3.time.format("%d-%m-%Y").parse;

      var x = d3.time.scale()
          .range([0, width]);

      var y = d3.scale.linear()
          .range([height, 0]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left");

      var area = d3.svg.area()
          .x(function(d) { return x(d.date); })
          .y0(height)
          .y1(function(d) { return y(d.visits); });

      var svg = d3.select("#visits").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        
        data.forEach(function(d) {
          d.date = parseDate(d.date);
          d.visits = +d.visits;
        }); 

        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([0, d3.max(data, function(d) { return d.visits; })]);

        svg.append("path")
            .datum(data)
            .attr("class", "area")
            .attr("d", area);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Price ($)");
  }

  // Get pages data
    $http.get('./data/pages.json').success(function(data){
      $scope.pages = data;
    });

  // Get articles data
    $http.get('./data/articles.json').success(function(data){
      $scope.articles = data;
    });

  // Get visits
    $http.get('./data/visits.json').success(function(data){
      //$scope.visits = data;
      makeChart(data);
    });
})
.controller('nopeCtrl', function($scope, $rootScope, $http, $stateParams, $timeout) {
  console.log('oups');
});
