'use strict';

angular.module('app.services').
    service('githubService', function($http, localStorage) {
    var headers = { 'Authorization': 'token ' + localStorage.githubAccessToken };
    return {
        isAuthenticated: function() {
            return !!localStorage.githubAccessToken;
        },
        authenticate: function(code) {
            return $http.post('/api/github/oauth', { code: code });
        },
        findUser: function(login) {
            return $http.get('https://api.github.com/users/' + login, { cache: true, headers: headers });
        },
        getCurrentUser: function() {
            return $http.get('https://api.github.com/user', { cache: true, headers: headers });
        },
        repositories: function() {
            return $http.get('https://api.github.com/user/repos', { cache: true, headers: headers });
        }
    };
});
