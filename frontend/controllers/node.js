'use strict';

angular.module('app.controllers').
    controller('NodeController', function($scope, npmService) {
    $scope.modules = npmService.all();
});
