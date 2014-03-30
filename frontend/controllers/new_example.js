'use strict';

app.controller('NewExampleController', function($scope, $rootScope, $state, ExampleService) {
    $scope.create = function(example) {
        ExampleService.create(example).success(function(example) {
            $state.go('example', {github: $rootScope.user.github.login, slug: example.slug});
        });
    };
});
