'use strict';

var express = require('express'),
    controllers = require('../controllers');

var app = express.Router();

app.use('/api', require('./api'));

app.get('/github/register', controllers.Github.register);
app.get('/github/callback', controllers.Github.callback);

app.get('*', controllers.Home.index);

module.exports = app;
