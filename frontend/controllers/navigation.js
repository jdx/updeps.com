'use strict';

app.controller('NavigationController', function($rootScope, GithubService) {
    $rootScope.user = {};
    GithubService.getCurrentUser().then(function(user) { $rootScope.user.github = user; });
});
