'use strict';

var gulp    = require('gulp'),
    nodemon = require('gulp-nodemon'),
    jshint  = require('gulp-jshint');

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

gulp.task('test', ['lint']);

gulp.task('start', ['lint'], function() {
    nodemon({script: 'backend/server.js', ext: 'js'})
        .on('change', ['lint']);
});
