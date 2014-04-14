var gulp = require('gulp');

// Copy files from `/vendor` into `/public`
gulp.task('vendor', function() {
  return gulp.src('vendor/**/*')
             .pipe(gulp.dest('public/vendor'));
});
