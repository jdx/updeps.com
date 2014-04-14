// # node routes
//
// This is the route configuration for the node app that
// links the controllers to the server.

var di = require('di')
  , express = require('express')
  , NpmController = require('./controllers/npm')
  , RepositoriesController = require('./controllers/repositories')
  , GithubController = require('./controllers/github')
  , _ = require('lodash');

// Load controllers
var injector = new di.Injector([]);
var controllers = {
  npm: injector.get(NpmController),
  repositories: injector.get(RepositoriesController),
  github: injector.get(GithubController)
};

module.exports = function() {
  var api = express.Router();

  // Here we can have an index of the routes in the system.
  // Useful for hypermedia APIs.
  api.get('/', function(req, res) {
    res.json({
      repositories_url: 'https://updeps.com/v1/repositories',
      repositories_search_url: 'https://updeps.com/v1/repositories/search?q={query}{&per_page}'
    });
  });

  api.get('/repositories', controllers.repositories.index);
  api.get('/repositories/search', controllers.repositories.search);
  api.get('/repositories/:author/:repo', controllers.repositories.show);

  api.get('/npm/:name', controllers.npm.lookup.bind(controllers.npm));

  //
  // ## Custom routes go here.
  // ```javascript
  // api.route('/users/:user_id')
  // .get(controllers.user.show)
  // .post(controllers.user.create)
  // .put(controllers.user.update)
  // .delete(controllers.user.destroy)
  // ```
  // For more information check [expressjs docs](http://expressjs.com/4x/api.html#router).
  //

  // Create the non-API routes.
  var app = express.Router();

  // Mount the API routes
  app.use('/api/v1', api);

  app.get('/github', controllers.github.redirect);
  app.get('/github/callback', controllers.github.callback);

  // If no route matches default to showing the [angular app](../angular/app.html).
  app.get('*', function (req, res) { res.render('../layout'); });

  return app;
}
