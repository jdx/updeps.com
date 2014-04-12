// [Gulp](http://gulpjs.com) configuration for mean framework.
// Gulp is a task runner that allows us to run our application.
// To start the application, simply type `gulp`.
//
// There is a [backend node/express app](node/server.html) and [frontend angular](angular/app.html) app this will host.

var config = require('./config')
    , gulp = require('gulp')
    , gutil = require('gulp-util')
    , nodemon = require('gulp-nodemon')
    , stylus = require('gulp-stylus')
    , livereload = require('gulp-livereload')
    , ngmin = require('gulp-ngmin')
    , uglify = require('gulp-uglify')
    , concat = require('gulp-concat')
    , rev = require('gulp-rev')
    , docco = require('gulp-docco')
    , jshint = require('gulp-jshint');


// # Main gulp tasks
// To see all available tasks, run `gulp --tasks`.

// Default entry point when running `gulp`.
gulp.task('default', ['server']);

// Builds static assets into `/public`
gulp.task('build', ['lint', 'vendor', 'partials', 'css', 'scripts']);

// Runs the test suite for [node](node/server.html) and [angular](angular/app.html)
gulp.task('test', ['lint']);

// Build documentation
gulp.task('doc', function() {
    gulp.src(paths.lint)
      .pipe(docco())
      .pipe(gulp.dest('docs'));
});

// Run the [node/express](node/server.js) app.
gulp.task('server', ['lint', 'build', 'watch'], function() {
    nodemon({script: 'node/server.js',
            ext: 'js',
            ignore: ['angular', 'public']});
});

// All of the file paths gulp will need to parse/render.
var paths = {
    css: 'css/**/*.styl',
    lint: ['**/*.js', '!node_modules/**', '!public/**', '!vendor/**'],
    partials: ['angular/partials/**/*.html'],
    scripts: ['angular/app.js', 'angular/routes.js',
        'angular/controllers/module.js', 'angular/controllers/**/*.js',
        'angular/directives/module.js', 'angular/directives/**/*.js',
        'angular/filters/module.js', 'angular/filters/**/*.js',
        'angular/services/module.js', 'angular/services/**/*.js'
    ],
};

// Checks javascript syntax
gulp.task('lint', function() {
    gulp.src(paths.lint)
        .pipe(jshint());
});

// Copy files from `/vendor` into `/public`
gulp.task('vendor', function() {
    gulp.src('vendor/**/*')
        .pipe(gulp.dest('public/vendor'));
});

// Copy [angular](angular/app.html) partial files from `/angular/partials`
gulp.task('partials', function() {
    var stream = gulp.src(paths.partials);
    if (config.assets.minify) {
        stream = stream
        .pipe(rev())
        .pipe(gulp.dest('public/partials'))
        .pipe(rev.manifest());
    }
    stream.pipe(gulp.dest('public/partials'));
});

// Parse stylus files into css
gulp.task('css', function() {
    var stream = gulp.src('css/app.styl');
    if (config.assets.minify) {
        stream = stream
        .pipe(stylus({set: ['compress']}))
        .pipe(rev())
        .pipe(gulp.dest('public/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('public/css'));
    } else {
        stream = stream
        .pipe(stylus())
        .on('error', gutil.log)
        .pipe(gulp.dest('public/css'));
    }
});

// Compile angular javascript files
gulp.task('scripts', function() {
    var stream = gulp.src(paths.scripts);
    if (config.assets.minify) {
        stream.pipe(concat('app.min.js'))
            // [ngmin](https://www.npmjs.org/package/ngmin)
            // is used to prep angular files to be minified.
            .pipe(ngmin())

            // Minify javascript
            .pipe(uglify())

            // Tack file hash to end of filename with [rev](https://www.npmjs.org/package/gulp-rev)
            // Helps with caching through a CDN since you never need to expire assets.
            .pipe(rev())
            .pipe(gulp.dest('public/js'))

            // Build the [rev](https://www.npmjs.org/package/gulp-rev)
            .pipe(rev.manifest())
            .pipe(gulp.dest('public/js'));
    } else {
        // If we aren't minifying, simply concatenate the files
        stream.pipe(concat('app.js'))
            .pipe(gulp.dest('public/js'));
    }
});

// Gulp file watchers.
// This sets up what tasks need to be run when files change.
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.lint, ['lint']);
    gulp.watch(paths.partials, ['partials']);
    gulp.watch(paths.css, ['css']);
    // Using the [livereload](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions)
    // extension, have the browser automatically refresh when assets are updated.
    gulp.watch('public/**/*', function(event) {
        gulp.src(event.path).pipe(livereload());
    });
});
