// # Frontend Angular.js portion of MEAN stack.
// This sets up the main `app` module and its dependencies.

// # Dependencies
//
// * [ng-route](http://docs.angularjs.org/api/ngRoute/service/$route) using route config in [routes.js](routes.html).
// * [config.js module](config.html) which loads config from [public config](../config.html) in the root of the project.
// * [controllers](controllers/module.html)
// * [controllers](controllers/module.html)
// * [directives](directives/module.html)
// * [filters](filters/module.html)

angular.module('app', [
    'ngRoute',
    'config',
    'app.controllers',
    'app.directives',
    'app.filters'
]);

// We use a structure where all of the applications [controllers](controllers/module.html)/[directives](directives/module.html)/[filters](filters/module.html)
// are a part of their own module. An alternative to this would be to split based on application feature. Both work well, but
// I would suggest this method at first or on small applications.
