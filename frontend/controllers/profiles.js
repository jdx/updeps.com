'use strict';

app.controller('ProfilesController', function($scope, $stateParams, GithubService) {
    GithubService.findUser($stateParams.login).success(function(user) {
        $scope.githubUser = user;
    });
});
