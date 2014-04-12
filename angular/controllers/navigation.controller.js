var app = angular.module('app.controllers');

app.controller('NavigationController', function($rootScope, config) {
    $rootScope.config = config;
});
