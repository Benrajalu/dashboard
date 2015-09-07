angular.module('app')
.controller('login', function($scope, $rootScope, $http, $stateParams, $timeout, $state, $cookies) {
  $rootScope.login = false;
  $('#form-login').parsley();

  $scope.user = {
    'nameInput' : '',
    'passInput': ''
  };

  $scope.validate = function(){
    $scope.message = false;
    if($scope.user.nameInput == 'user' && $scope.user.passInput == 'llamabraguette'){
      $cookies.put('login', true);
      $rootScope.login = $cookies.get('login');
      console.log($rootScope.login);
      $state.go('dashboard', {}, {reload: false});
    }else{
      $scope.message = 'Votre identifiant ou votre mot de passe sont invalides, merci de rééssayer !'
    }
  }
})