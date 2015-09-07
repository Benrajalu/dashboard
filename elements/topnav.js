angular.module('app')
.controller('topNav', function($scope, $rootScope, $http, $stateParams, $timeout, $location){
	// User
	$http.get('./data/user.json').success(function(data){
		$scope.user = data;
	});

	// Menu entries
	$http.get('./data/menu.json').success(function(data){
		$scope.menu = data;

		// Set transition delay according to place in loop
		$scope.transition = function($index){
		    var delay = $index * 50 + 'ms';
		    return {'transition-delay' : delay};
		};
		$scope.toggle = false;
	});
});