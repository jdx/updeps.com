'use strict';

angular.module('app.controllers').
    controller('NavigationController', function(config, $rootScope, githubService, authService) {
    $rootScope.config = config;
    if (githubService.isAuthenticated()) {
        $rootScope.githubAccessToken = githubService.accessToken();
        githubService.getCurrentUser().success(function(github) {
            $rootScope.github = github;
        });
    }
    $rootScope.$watch('githubAccessToken', function(token) {
        if(token) {
            authService.jwtFromGithub(token).success(function(jwt) {
                console.log(jwt);
                $rootScope.jwt = jwt;
            });
        }
    });
});
