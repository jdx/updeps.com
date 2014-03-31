'use strict';

var config = require('config');

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: '/partials/home.html'
    })
    .state('examples', {
        url: '/:github/examples',
        templateUrl: '/partials/examples/index.html',
        controller: 'ExamplesController'
    })
    .state('example', {
        url: '/:github/examples/:slug',
        templateUrl: '/partials/examples/show.html',
        controller: 'ShowExampleController'
    })
    .state('repos', {
        url: '/repos',
        templateUrl: '/partials/repos.html',
        controller: 'ReposController'
    })
    .state('node', {
        url: '/node/:name',
        templateUrl: '/partials/node_module.html',
        controller: 'NodeModulesController'
    })
    .state('github', {
        url: '/github/register',
        controller: function($window) {
            $window.location.href = 'https://github.com/login/oauth/authorize?client_id=' + config.github.clientId;
        }
    })
    .state('profile', {
        url: '/:github',
        templateUrl: '/partials/profile.html',
        controller: 'ProfilesController'
    });
});

