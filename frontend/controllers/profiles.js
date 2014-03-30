'use strict';

app.controller('ProfilesController', function($scope, $stateParams, GithubService) {
    GithubService.findUser($stateParams.github).success(function(user) {
        $scope.githubUser = user;
    });
});
