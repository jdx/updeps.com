var app = angular.module('app');

app.service('authService', function(localStorage) {
    function isLoggedIn() {
        return !!localStorage.jwt;
    }
    return {
        isLoggedIn: isLoggedIn
    };
});
