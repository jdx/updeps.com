var app = angular.module('app');

app.service('authService', function(localStorage, extensionId, $http) {
    function jwt() {
        return localStorage.jwt;
    }

    function setJwt(jwt) {
        localStorage.jwt = jwt;
    }

    function isLoggedIn() {
        return !!jwt();
    }

    if (isLoggedIn()) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + jwt();
    }

    function notifyChromeExtension() {
        chrome.runtime.sendMessage(extensionId, { jwt: jwt() });
    }

    if (chrome && chrome.runtime && isLoggedIn()) { notifyChromeExtension(); }

    return {
        jwt: jwt,
        setJwt: setJwt,
        isLoggedIn: isLoggedIn
    };
});
