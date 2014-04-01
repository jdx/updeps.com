'use strict';

angular.module('app.services').
    service('npmService', function($http) {
    return {
        all: function() {
            return [
                'angular',
                'lodash'
            ];
        },
        find: function(name) {
            return $http.jsonp('//registry.npmjs.org/' + name + '/latest?jsonp=JSON_CALLBACK');
        }
    };
});
