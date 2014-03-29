'use strict';
var angular = require('angular');

var app = angular.module('app', ['ui.router', 'restangular']);

app.config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setRestangularFields({ id: "_id" });
});

module.exports = app;
