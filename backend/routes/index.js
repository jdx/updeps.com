var express = require('express'),
    home    = require('../controllers/home');

routes = express.Router();

routes.get('/', home.index);

module.exports = routes;
