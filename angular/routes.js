// # Angular route config

angular.module('app').
    config(function($routeProvider, $locationProvider, partials) {

    // Use push state
    $locationProvider.html5Mode(true);

    function partial(base) {
      return partials[base] ? '/partials/' + partials[base] : '/partials/' + base;
    }

    // Setup routes
    $routeProvider
    .when('/', {
        templateUrl: partial('home.html'),
        controller: 'HomeController'
    })
    .when('/login', {
        template: '',
        controller: 'LoginController'
    })
    .when('/repositories', {
        templateUrl: partial('repositories/index.html'),
        controller: 'RepositoriesController'
    })

    // default route
    .otherwise({redirectTo: '/'});
});

