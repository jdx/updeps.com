var gulp = require('gulp')
  , mocha = require('gulp-mocha');

gulp.task('test', function() {
  gulp.src('node/test/*.js')
    .pipe(mocha());
});
