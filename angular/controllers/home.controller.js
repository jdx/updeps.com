// # Home Controller

var app = angular.module('app.controllers');

app.controller('HomeController', function($scope, $http) {
    $scope.search = function(q) {
        $http.get('/api/v1/repositories/search', {
            params: { q: q }
        })
        .success(function(results) {
            $scope.results = results;
        });
    };
});
