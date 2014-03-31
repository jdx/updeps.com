'use strict';

angular.module('app.controllers').
    controller('ReposController', function($scope, githubService) {
    githubService.repositories().success(function(repositories) {
        $scope.repos = repositories;
    });
});
