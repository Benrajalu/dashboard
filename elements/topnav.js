angular.module('app')
.controller('topNav', function($scope, $rootScope, $http, $stateParams, $timeout, $location){
	// User
	$http.get('data/user.json').success(function(data){
		$scope.user = data;
	});

	// Menu entries
	$http.get('data/menu.json').success(function(data){
		$scope.menu = data;
	});
});


// Below are jQuery helpers to display an active marker

var activeState = function(){
	var active = $('#nav-mainNav li.active'),
		width = $(active).outerWidth(),
		position = $(active).offset().left,
		marker = $('#current');

	$(marker).css('left', position + (width/2) + 'px');
}

setTimeout(function(){
	activeState();	
},200)

$(document).on('click', '#nav-mainNav a', function(){
	setTimeout(function(){
		activeState();	
	},200)
})

$(window).resize(function(){
	activeState();	
})
