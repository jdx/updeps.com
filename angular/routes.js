// # Angular route config

angular.module('app').
    config(function($routeProvider, $locationProvider) {

    // Use push state
    $locationProvider.html5Mode(true);

    // Setup routes
    $routeProvider
    .when('/', {
        templateUrl: '/partials/home.html',
        controller: 'HomeController'
    })
    .when('/login', {
        template: '',
        controller: 'LoginController'
    })

    // default route
    .otherwise({redirectTo: '/'});
});

