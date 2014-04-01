'use strict';

angular.module('app').
    config(function($routeProvider, $locationProvider, config) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', { templateUrl: '/views/home.html'})
    .when('/github', {
        template: '',
        controller: function() {
            window.location.href = 'https://github.com/login/oauth/authorize?client_id=' + config.github.clientId;
        }
    })
    .when('/github/callback', {
        template: '',
        controller: 'GithubController'
    })
    .when('/examples', {
        templateUrl: '/views/examples/index.html',
        controller: 'ExamplesController'
    })
    .when('/examples/:slug', {
        templateUrl: '/views/examples/show.html',
        controller: 'ShowExampleController'
    })
    .when('/repos', {
        templateUrl: '/views/repos.html',
        controller: 'ReposController'
    })
    .when('/node', {
        templateUrl: '/views/node/index.html',
        controller: 'NodeController'
    })
    .when('/node/:name', {
        templateUrl: '/views/node/show.html',
        controller: 'NodeModulesController'
    })
    .when('/:github', {
        templateUrl: '/views/profile.html',
        controller: 'ProfilesController'
    })
    .otherwise({redirectTo: '/'});
});

