'use strict';

var angular = require('angular');
var routes = require('./routes');

var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'templates/home.html',
        controller: 'homeController'
    });
});

