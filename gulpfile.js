'use strict';

var _ = require('lodash')
    , gulp = require('gulp')
    , gutil = require('gulp-util')
    , nodemon = require('gulp-nodemon')
    , rename = require('gulp-rename')
    , stylus = require('gulp-stylus')
    , livereload = require('gulp-livereload')
    , ngmin = require('gulp-ngmin')
    , uglify = require('gulp-uglify')
    , cache = require('gulp-cached')
    , concat = require('gulp-concat')
    , jshint = require('gulp-jshint');

var paths = {
    css: 'css/app.styl',
    lint: ['**/*.js', '!node_modules/**', '!public/**', '!vendor/**'],
    views: ['views/**/*.html'],
    scripts: {
        'app.js': 'frontend/app.js',
        'routes.js': 'frontend/routes.js',
        'controllers.js': 'frontend/controllers/**/*.js',
        'directives.js': 'frontend/directives/**/*.js',
        'filters.js': 'frontend/filters/**/*.js',
        'services.js': 'frontend/services/**/*.js'
    }
};

gulp.task('lint', function() {
    gulp.src(paths.lint)
        .pipe(cache('linting'))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('vendor', function() {
    gulp.src('vendor/**/*')
        .pipe(gulp.dest('public/vendor'));
});

gulp.task('views', function() {
    gulp.src(paths.views)
        .pipe(gulp.dest('public/views'));
});

gulp.task('css', function() {
    gulp.src(paths.css)
        .pipe(stylus())
        .on('error', gutil.log)
        .pipe(gulp.dest('public/css'));
});

gulp.task('scripts', function() {
    _.each(paths.scripts, function(paths, file) {
        gulp.src(paths)
            .pipe(concat(file))
            .pipe(gulp.dest('public/js'));
    });
});

gulp.task('watch', function() {
    _.forOwn(paths.scripts, function(paths) {
        gulp.watch(paths, ['scripts']);
    });
    gulp.watch(paths.lint, ['lint']);
    gulp.watch(paths.views, ['views']);
    gulp.watch(paths.css, ['css']);
    gulp.watch('public/**/*', function(event) {
        gulp.src(event.path).pipe(livereload());
    });
});

gulp.task('minify', ['scripts'], function() {
    gulp.src('public/app.js')
        .pipe(ngmin())
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('test', ['lint']);
gulp.task('default', ['test', 'build']);
gulp.task('build', ['lint', 'vendor', 'views', 'css', 'scripts', 'minify']);

gulp.task('server', ['lint', 'build', 'watch'], function() {
    nodemon({script: 'backend/server.js',
            ext: 'js',
            ignore: ['frontend', 'public']});
});
