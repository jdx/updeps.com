'use strict';

var express = require('express'),
    controllers = require('./controllers');

var app = express.Router()
    , api = express.Router();

api.post('/github/oauth', controllers.Github.oauth);

api.route('/examples')
  .get(controllers.Examples.index)
  .post(controllers.Examples.create);

api.route('/examples/:id')
  .get(controllers.Examples.show)
  .put(controllers.Examples.update);

app.use('/api', api);

app.get('*', controllers.Home.index);

module.exports = app;
