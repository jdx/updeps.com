var app = angular.module('app.controllers');

app.controller('LoginController', function($location, $window, authService) {
    jwt = $location.search().jwt;
    if (!jwt) { return $window.location.href = '/github'; }
    authService.setJwt(jwt);
    $location.path('/').search('');
});
