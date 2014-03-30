'use strict';

app.service('ExampleService', function($http) {
    return {
        create: function(example) {
            return $http.post('/api/examples', example);
        },
        allForGithub: function() {
            return $http.get('/api/examples');
        },
        one: function(github, slug) {
            return $http.get('/api/examples/' + slug);
        }
    };
});
