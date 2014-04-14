// # Node.js
// The backend node server has 3 responsibilities:
//
// ## Angular init
// The server returns the [initial view](../../layout.html.ejs) that bootstraps the [angular app](../angular/app.html).
// It matches all URLs except those listed in [routes.js](routes.html).
//
// ## Asset host
// This is where the static files are served.
//
// ## REST API
// Node.js serves our API via REST and persists to a MongoDB server.
//
// The database is configured in [mongo.js](mongo.html)
// using models in [/node/models/](models/index.html).

// # Configure express

var express = require('express')
    , favicon = require('static-favicon')
    , bodyParser = require('body-parser')
    , compression = require('compression')
    , config = require('../config')
    , helpers = require('./helpers')
    , logger = require('./logger')
    , authentication = require('./authentication')
    , cors = require('cors')
    , routes = require('./routes');

// Create express app
var app = express();

// Ensure config is available in all views
app.locals.config = config;

// Load helpers
app.locals.helpers = helpers;

// # Configure middleware

// [gzip compression](https://www.npmjs.org/package/compression) for everything
app.use(compression());

// [Use static favicon](https://www.npmjs.org/package/static-favicon)
app.use(favicon());

app.use(cors());

// Cache assets for 1 year if enabled
var maxAge = config.assets.cache ? 31536000000 : 0;

// Serve static assets from `../public`
app.use(express.static(__dirname + '/../public', { maxAge: maxAge}));

// Use [prerender.io](https://prerender.io) for SEO
app.use(require('prerender-node'));

// Use our [custom logger](logger.html)
app.use(logger.requestLogger);

// [Parse POST body as JSON](https://www.npmjs.org/package/body-parser)
app.use(bodyParser());

app.use(authentication());

// Use [routes.js](routes.html)
app.use(routes());

// Use [ejs](http://embeddedjs.com/) for view rendering
app.engine('html.ejs', require('ejs').renderFile);
app.set('view engine', 'html.ejs');

// # Start server
app.listen(config.port);
logger.info('%s listening on port %d', config.app, config.port);
