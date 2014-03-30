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
    cache = require('gulp-cached'),
    jshint = require('gulp-jshint');

var jsFiles = [
    'gulpfile.js',
    'backend/**/*.js',
    'frontend/**/*.js',
    'config/**/*.js'
];

gulp.task('lint', function() {
    gulp.src(jsFiles)
        .pipe(cache('linting'))
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
        .on('error', gutil.log)
        .pipe(gulp.dest('./public/'));
});

gulp.task('scripts', function() {
    browserify('./frontend/app.js')
        .bundle()
        .on('error', gutil.log)
        .pipe(source('./frontend/app.js'))
        .pipe(rename('app.js'))
        .pipe(gulp.dest('public'));
});

gulp.task('watch', function() {
    gulp.watch('frontend/**/*.js', ['scripts']);
    gulp.watch(jsFiles, ['lint']);
    gulp.watch('views/partials/**/*.html', ['partials']);
    gulp.watch('css/**/*.styl', ['css']);
    gulp.watch(['public/**/*.js', 'public/**/*.html', 'public/**/*.css'], function(event) {
        gulp.src(event.path).pipe(livereload());
    });
});

gulp.task('minify', ['scripts'], function() {
    gulp.src('public/app.js')
        .pipe(ngmin())
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('public'));
});

gulp.task('test', ['lint']);
gulp.task('default', ['test']);
gulp.task('build', ['lint', 'partials', 'css', 'scripts', 'minify']);

gulp.task('start', ['lint', 'build', 'watch'], function() {
    nodemon({script: 'backend/server.js',
            ext: 'js',
            ignore: ['frontend', 'public']});
});
