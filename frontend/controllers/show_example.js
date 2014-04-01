'use strict';

angular.module('app.controllers').
    controller('ShowExampleController', function($scope, $location, $routeParams, exampleService) {
    if ($routeParams.slug !== 'new') {
        exampleService.one($routeParams.slug).success(function(example) {
            $scope.example = example;
        });
    }

    $scope.updated = _.debounce(function(example) {
        if(example.title) {
            exampleService.update(example).success(function(example) {
                $location.path('/examples/' + example.slug);
            });
        }
    }, 1000, {maxWait: 10000});
});
