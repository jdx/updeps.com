var config = require('../config')
  , gulp = require('gulp')
  , livereload = require('gulp-livereload');

// Gulp file watchers.
// This sets up what tasks need to be run when files change.
gulp.task('watch', function() {
  gulp.watch(config.assets.paths.scripts, ['scripts']);
  gulp.watch(config.assets.paths.partials, ['partials']);
  gulp.watch(config.assets.paths.css, ['css']);
  gulp.watch(['**/*.js', '!node_modules/**', '!public/**', '!vendor/**'], ['lint']);
  // Using the [livereload](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions)
  // extension, have the browser automatically refresh when assets are updated.
  gulp.watch('public/**/*', function(event) {
    gulp.src(event.path).pipe(livereload());
  });
});
