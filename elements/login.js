angular.module('app')
.controller('login', function($scope, $rootScope, $http, $stateParams, $timeout, $state) {
  $rootScope.login = false;
  $('#form-login').parsley();

  $scope.user = {
    'nameInput' : '',
    'passInput': ''
  };

  $scope.validate = function(){
    $scope.message = false;
    if($scope.user.nameInput == 'user' && $scope.user.passInput == 'llamabraguette'){
      $state.go('dashboard', {}, {reload: false});
      $rootScope.login = true;
    }else{
      $scope.message = 'Votre identifiant ou votre mot de passe sont invalides, merci de rééssayer !'
    }
  }
})