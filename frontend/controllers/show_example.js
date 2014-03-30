'use strict';

app.controller('ShowExampleController', function($scope, $state, ExampleService) {
    ExampleService.one($state.params.github, $state.params.slug).success(function(example) {
        $scope.example = example;
    });
});
