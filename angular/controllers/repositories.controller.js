var app = angular.module('app');

app.controller('RepositoriesController', function($scope, $http) {
    function reloadRepos() {
        $http.get('/api/v1/repositories')
        .success(function(repos) {
            $scope.repos = repos;
        });
    }

    $scope.addFromNPM = function(name) {
        $http.get('/api/v1/npm/' + name)
        .success(function() {
            reloadRepos();
        });
    };

    reloadRepos();
});
