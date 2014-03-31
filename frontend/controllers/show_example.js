'use strict';

var _ = require('lodash'),
    util = require('util');

app.controller('ShowExampleController', function($scope, $location, $state, ExampleService) {
    if ($state.params.slug !== 'new') {
        ExampleService.one($state.params.slug).success(function(example) {
            $scope.example = example;
        });
    }

    $scope.updated = _.debounce(function(example) {
        if(example.title) {
            ExampleService.update(example).success(function(example) {
                $location.path(util.format('/USERNAME/examples/' + example.slug));
            });
        }
    }, 1000, {maxWait: 10000});
});
