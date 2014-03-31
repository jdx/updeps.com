'use strict';

angular.module('app.controllers').
    controller('NavigationController', function(config, $rootScope, githubService) {
    $rootScope.config = config;
    $rootScope.user = {};
    if (githubService.isAuthenticated()) {
        githubService.getCurrentUser().success(function(user) { $rootScope.user.github = user; });
    }
});
