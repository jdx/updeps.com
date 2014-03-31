'use strict';

angular.module('app.controllers').
    controller('ExamplesController', function($scope, exampleService) {
    exampleService.all().success(function(examples) {
        $scope.examples = examples;
    });
});
