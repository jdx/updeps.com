'use strict';

window.app = require('angular').module('app', [
    'ui.router',
    'restangular',
    'ngCookies'
]);

app.config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setRestangularFields({ id: '_id' });
});

require('./routes');
require('./controllers');
require('./services');
