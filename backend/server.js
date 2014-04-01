var express = require('express')
    , logger = require('./logger')
    , favicon = require('static-favicon')
    , config = require('../config')
    , routes = require('./routes')
    , bodyParser = require('body-parser')
    , compression = require('compression')
    , prettyjson = require('prettyjson')
    , app = express();

app.use(compression());
app.use(favicon());
app.use(express.static(__dirname + '/../public'));
app.use(logger.requestLogger);
app.use(bodyParser());
app.use(routes);
app.engine('html.ejs', require('ejs').renderFile);
app.set('view engine', 'html.ejs');

app.listen(config.port);
logger.info('[%s] %s listening on port %d', config.app.name, config.appName, config.port);
