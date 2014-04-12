var app = angular.module('app.controllers');

app.controller('NavigationController', function($rootScope, config, authService) {
    $rootScope.config = config;
    $rootScope.isLoggedIn = authService.isLoggedIn();
});
