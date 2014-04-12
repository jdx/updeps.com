var app = angular.module('app.controllers');

app.controller('LoginController', function($location, $window, localStorage) {
    jwt = $location.search().jwt;
    if (!jwt) { return $window.location.href = '/github'; }
    localStorage.jwt = jwt;
    $location.path('/').search('');
});
