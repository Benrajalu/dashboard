angular.module('app')
  .controller('topNav', function($scope, $rootScope, $http, $stateParams, $timeout){
	    $http.get('data/user.json').success(function(data){
			$scope.user = data;
		});
  });