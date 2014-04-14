var gulp = require('gulp')
  , jshint = require('gulp-jshint');

// Checks javascript syntax
gulp.task('lint', function() {
  return gulp.src(['**/*.js', '!node_modules/**', '!public/**', '!vendor/**'])
             .pipe(jshint());
});
