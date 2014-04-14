var gulp = require('gulp')
  , nodemon = require('gulp-nodemon');

// Run the [node/express](node/server.js) app.
gulp.task('server', ['partials'], function() {
  nodemon({script: __dirname + '/../node/server.js', ext: 'js',
          ignore: ['angular', 'public', 'node/test', 'gulpfile.js', 'gulp']});
});
