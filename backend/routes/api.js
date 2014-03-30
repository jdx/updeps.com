'use strict';

var express = require('express'),
    controllers = require('../controllers');

var api = express.Router();

api.route('/examples')
  .get(controllers.Examples.index)
  .post(controllers.Examples.create);

api.route('/examples/:slug')
  .get(controllers.Examples.show);

module.exports = api;
