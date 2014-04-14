var config = require('../config')
  , gulp = require('gulp')
  , rev = require('gulp-rev');

// Copy [angular](angular/app.html) partial files from `/angular/partials`
gulp.task('partials', function() {
  var stream = gulp.src(config.assets.paths.partials);
  if (config.assets.minify) {
    stream = stream
    .pipe(rev())
    .pipe(gulp.dest('public/partials'))
    .pipe(rev.manifest());
  }
  stream.pipe(gulp.dest('public/partials'));
  return stream;
});
