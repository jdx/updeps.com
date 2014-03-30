'use strict';

app.controller('NavigationController', function($rootScope, GithubService) {
    $rootScope.user = {};
    GithubService.getCurrentUser().success(function(user) { $rootScope.user.github = user; });
});
