'use strict';

angular.module('app.services').
    service('githubService', function($http, localStorage) {
    return {
        accessToken: function() {
            return localStorage.githubAccessToken;
        },
        isAuthenticated: function() {
            return !!this.accessToken();
        },
        authenticate: function(code) {
            return $http.post('/api/github/oauth', { code: code });
        },
        findUser: function(login) {
            return $http.get('https://api.github.com/users/' + login, { cache: true, headers: this._headers() });
        },
        getCurrentUser: function() {
            return $http.get('https://api.github.com/user', { cache: true, headers: this._headers() });
        },
        repositories: function() {
            return $http.get('https://api.github.com/user/repos', { cache: true, headers: this._headers() });
        },
        _headers: function() {
            return { 'Authorization': 'token ' + this.accessToken() };
        }
    };
});
