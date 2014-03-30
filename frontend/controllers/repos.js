'use strict';

app.controller('ReposController', function($scope, GithubService) {
    GithubService.repositories().success(function(repositories) {
        $scope.repos = repositories;
    });
});
