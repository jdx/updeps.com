'use strict';

angular.module('app.controllers').
    controller('GithubController', function($rootScope, $routeParams, $location, localStorage, githubService) {
    githubService.authenticate($routeParams.code).success(function(resp) {
        localStorage.githubAccessToken = resp.access_token;
        $location.url('/');
    });
});
