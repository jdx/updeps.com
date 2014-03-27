'use strict';

var angular = require('angular');
var routes = require('./routes');

var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'partials/home.html',
        controller: function($scope) {
            $scope.items = ["a", "b"];
        }
    });
    console.log($stateProvider);
});

