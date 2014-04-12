// # Node helpers

var _ = require('lodash');

// find the rev js asset url
var js = function(asset) {
    var manifest = require('../public/js/rev-manifest.json');
    return '/js/' + manifest[asset];
};

// find the rev css asset url
var css = function(asset) {
    var manifest = require('../public/css/rev-manifest.json');
    return '/css/' + manifest[asset];
};

exports.js = _.memoize(js);
exports.css = _.memoize(css);
