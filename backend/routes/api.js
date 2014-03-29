'use strict';

var express = require('express'),
    controllers = require('../controllers');

var api = express.Router();

api.route('/contacts')
  .get(controllers.Contacts.index)
  .post(controllers.Contacts.create);
api.route('/contacts/:id')
  .put(controllers.Contacts.update)
  .delete(controllers.Contacts.destroy);

module.exports = api;
