var express = require('express'),
    logger = require('./logger'),
    favicon = require('static-favicon'),
    config = require('../config'),
    routes = require('./routes'),
    bodyParser = require('body-parser'),
    app = express();

app.use(favicon());
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser());
app.use(logger.RequestLogger);
app.use(routes);
app.use(logger.ErrorLogger);
app.engine('html.ejs', require('ejs').renderFile);
app.set('view engine', 'html.ejs');

app.listen(config.port);
logger.info('[%s] %s listening on port %d', config.app.name, config.appName, config.port);
