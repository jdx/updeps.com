'use strict';

angular.module('app.controllers').
    controller('GHController', function($scope, $http) {
    $scope.curl = 'https://api.github.com/user';
    $scope.run = function(curl) {
        var response = function(result, code) {
            $scope.result = result;
            $scope.code = code;
        };
        $http.get(curl).success(response).error(response);
    };
});
