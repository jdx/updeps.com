'use strict';

app.controller('ExamplesController', function($scope, $state, ExampleService) {
    ExampleService.allForGithub($state.params.github).success(function(examples) {
        $scope.examples = examples;
    });
});
