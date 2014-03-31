'use strict';

angular.module('app.services').
    service('npmService', function($http) {
    return {
        find: function(name) {
            return $http.jsonp('//registry.npmjs.org/' + name + '/latest?jsonp=JSON_CALLBACK');
        }
    };
});
