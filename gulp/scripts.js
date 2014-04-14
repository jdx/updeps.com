var config = require('../config')
  , gulp = require('gulp')
  , ngmin = require('gulp-ngmin')
  , uglify = require('gulp-uglify')
  , concat = require('gulp-concat')
  , rev = require('gulp-rev');

// Compile angular javascript files
gulp.task('scripts', function() {
  var stream = gulp.src(config.assets.paths.scripts);
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
  return stream;
});
