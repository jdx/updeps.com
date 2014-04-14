// [Gulp](http://gulpjs.com) configuration for mean framework.
// Gulp is a task runner that allows us to run our application.
// To start the application, simply type `gulp`.
//
// There is a [backend node/express app](node/server.html) and [frontend angular](angular/app.html) app this will host.

var gulp = require('gulp');

// # Main gulp tasks
// To see all available tasks, run `gulp --tasks`.

// Default entry point when running `gulp`.
gulp.task('default', ['server', 'build', 'watch']);

// Builds static assets into `/public`
gulp.task('build', ['lint', 'vendor', 'partials', 'css', 'scripts']);

// Load the other gulp tasks in `/gulp`
require('require-all')(__dirname + '/gulp');
