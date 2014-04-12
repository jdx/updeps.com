// # node routes
//
// This is the route configuration for the node app that
// links the controllers to the server.

var express = require('express');

// Load all [controllers](controllers/index.html).
var controllers = require('./controllers');

var api = express.Router();

// Here we can have an index of the routes in the system.
// Useful for hypermedia APIs.
api.get('/', controllers.index);

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

// If no route matches default to showing the [angular app](../angular/app.html).
app.get('*', function (req, res) { res.render('../layout'); });

module.exports = app;
