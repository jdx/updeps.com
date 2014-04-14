var config = require('../config')
  , gulp = require('gulp')
  , gutil = require('gulp-util')
  , stylus = require('gulp-stylus')
  , rev = require('gulp-rev');

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
  return stream;
});
