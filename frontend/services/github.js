'use strict';

app.service('GithubService', function($http, $cookies, $q) {
    var currentUser,
        headers = { 'Authorization': 'token ' + $cookies.github_auth_token };
    return {
        findUser: function(login) {
            return $http.get('https://api.github.com/users/' + login, { cache: true, headers: headers });
        },
        getCurrentUser: function() {
            var deferred = $q.defer();
            if (!currentUser) {
                $http.get('https://api.github.com/user', { cache: true, headers: headers }).success(function(user) {
                    currentUser = user;
                    deferred.resolve(currentUser);
                });
            } else {
                deferred.resolve(currentUser);
            }
            return deferred.promise;
        },
        repositories: function() {
            return $http.get('https://api.github.com/user/repos', { cache: true, headers: headers });
        }
    };
});
