'use strict';

angular.module('app.services').
    service('authService', function($http) {
    return {
        jwtFromGithub: function(token) {
            return $http.post('/api/user', { github: token });
        }
    };
});
