'use strict';

app.controller('ExamplesController', function($scope, $state, ExampleService) {
    ExampleService.all().success(function(examples) {
        $scope.examples = examples;
    });
});
