'use strict';

angular.module('app.services').
    service('exampleService', function($http) {
    return {
        create: function(example) {
            return $http.post('/api/examples', {
                title: example.title,
                body: example.body
            });
        },
        all: function() {
            return $http.get('/api/examples');
        },
        one: function(slug) {
            return $http.get('/api/examples/' + slug);
        },
        update: function(example) {
            var body = {
                title: example.title,
                body: example.body
            };
            if (example._id) {
                return $http.put('/api/examples/' + example._id, body);
            } else {
                return $http.post('/api/examples', body);
            }
        }
    };
});
