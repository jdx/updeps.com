// # Node helpers

var _ = require('lodash')
  , config = require('../config');

// find the rev js asset url
exports.js = function(asset) {
  var manifest = require('../public/js/rev-manifest.json');
  return '/js/' + manifest[asset];
};

// find the rev css asset url
exports.css = function(asset) {
  var manifest = require('../public/css/rev-manifest.json');
  return '/css/' + manifest[asset];
};

exports.partials = function() {
  if (config.assets.minify) return require('../public/partials/rev-manifest.json');
  else return {};
};

exports.partial = function(base) {
  if (config.assets.minify) {
    return '/partials/' + exports.partials()[base];
  } else {
    return '/partials/' + base;
  }
};
