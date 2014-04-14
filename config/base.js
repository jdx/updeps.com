// # Base configuration
//
// Environment configs will inherit from this config.
//
// Environments:
// * [development](development.html)
// * [production](production.html)

// Grab some of the config from the [node package file](../../package.json).
var pkg = require('../package.json');

module.exports = {

  // Set environment based on `NODE_ENV` environment variable.
  // Default to [development](development.html).
  env: process.env.NODE_ENV || 'development',

  // Port to serve node backend on
  port: 3000,

  // Name for app, used in [header](../../angular/partials/header.html).
  app: pkg.name,

  secret: process.env.SECRET_KEY || 'changeme',

  mongo: {uri: 'mongodb://localhost:27017/updeps'},

  // Default to cache and minify assets
  // Caching happens in [node](../node/server.html), minification in [gulpfile.js](../gulpfile.html)
  assets: {
    cache: true,
    minify: true,
    paths: {
      css: ['css/**/*.styl'],
      partials: ['angular/partials/**/*.html'],
      scripts: [
        'angular/app.js', 'angular/routes.js',
        'angular/controllers/module.js', 'angular/controllers/**/*.js',
        'angular/directives/module.js', 'angular/directives/**/*.js',
        'angular/filters/module.js', 'angular/filters/**/*.js',
        'angular/services/module.js', 'angular/services/**/*.js'
      ]
    }
  },

  github: {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET
  },

  // config that will be sent to the browser for use in Angular
  public: {
    app: pkg.name,
    author: pkg.author
  }
};

// This file is loaded by [config/index.js](index.html).
