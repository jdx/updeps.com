'use strict';

app.service('GithubService', function($http, $cookies) {
    var headers = { 'Authorization': 'token ' + $cookies.github_auth_token };
    return {
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
