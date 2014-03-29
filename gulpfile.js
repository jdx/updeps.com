'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    nodemon = require('gulp-nodemon'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    rename = require('gulp-rename'),
    stylus = require('gulp-stylus'),
    livereload = require('gulp-livereload'),
    ngmin = require('gulp-ngmin'),
    uglify = require('gulp-uglify'),
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

gulp.task('partials', function() {
    gulp.src('./views/partials/**/*.html')
        .pipe(gulp.dest('public/partials'));
});

gulp.task('css', function() {
    gulp.src('./css/app.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./public/'));
});

gulp.task('scripts', function() {
    browserify('./frontend/init.js')
        .bundle()
        .on('error', gutil.log)
        .pipe(source('./frontend/init.js'))
        .pipe(rename('init.js'))
        .pipe(gulp.dest('public'));
});

gulp.task('watch', ['css', 'partials', 'scripts'], function() {
    gulp.watch('frontend/**/*.js', ['scripts']);
    gulp.watch('views/partials/**/*.html', ['partials']);
    gulp.watch('css/**/*.styl', ['css']);
    gulp.watch('public/**/*', function(event) {
        gulp.src(event.path).pipe(livereload());
    });
});

gulp.task('minify', ['css', 'scripts'], function() {
    gulp.src('public/init.js')
        .pipe(ngmin())
        .pipe(uglify())
        .pipe(rename('init.min.js'))
        .pipe(gulp.dest('public'));
});

gulp.task('test', ['lint']);
gulp.task('default', ['test']);
gulp.task('build', ['lint', 'css', 'partials', 'scripts', 'minify']);

gulp.task('start', ['lint', 'watch'], function() {
    nodemon({script: 'backend/server.js',
            ext: 'js',
            ignore: ['frontend', 'public']})
        .on('change', ['lint']);
});
