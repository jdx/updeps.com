'use strict';

var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint');

var jsFiles = [
    'gulpfile.js',
    'backend/**/*.js',
    'frontend/**/*.js',
    'config/**/*.js'
];

gulp.task('lint', function() {
    gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('scripts', function() {
    browserify('./frontend/app.js')
        .bundle()
        .pipe(source('./frontend/app.js'))
        .pipe(rename('app.js'))
        .pipe(gulp.dest('public'));
});

gulp.task('watch', ['scripts'], function() {
    gulp.watch('frontend/**/*.js', ['scripts']);
});

gulp.task('test', ['lint']);
gulp.task('default', ['test']);

gulp.task('start', ['lint', 'watch'], function() {
    nodemon({script: 'backend/server.js', ext: 'js'})
        .on('change', ['lint']);
});
