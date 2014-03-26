var express = require('express'),
    morgan  = require('morgan'),
    favicon = require('static-favicon'),
    config  = require('../config'),
    routes  = require('./routes'),
    app     = express();

app.use(favicon());
app.use(express.static(__dirname + '/../public'));
app.use(morgan('dev'));
app.set('view engine', 'ejs');

app.use(routes);

app.listen(config.port);
console.log(config.app.name + ' listening on port: ' + config.port +
            ' env: ' + config.env);
