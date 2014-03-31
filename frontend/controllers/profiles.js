'use strict';

angular.module('app.controllers').
    controller('ProfilesController', function($scope, $routeParams, githubService) {
    githubService.findUser($routeParams.github).success(function(user) {
        $scope.githubUser = user;
    });
});
