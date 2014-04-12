//# Logger
//
// Custom logger for our [express app](server.html).
//
// You should customize this to fit your needs.
//
// This uses [winston](https://www.npmjs.org/package/winston) which can output console, file, and json logs.

var _ = require('lodash')
    , fs = require('fs')
    , util = require('util')
    , winston = require('winston')
    , prettyjson = require('prettyjson')
    , config = require('../config');

// Find out the filename for our logfile.
var logFilename = util.format('logs/%s.log', config.env);

// Setup the base logger to output to the console and log file.
fs.mkdir('logs', function () {});
var logger = new winston.Logger({
    transports: [
        new winston.transports.Console({colorize: true}),
        new winston.transports.File({ filename: logFilename})
    ]
});

// Format to use for each express request.
//
// Will look like this:
// ```
// GET updeps.dev/ - 127.0.0.1 - 200 - 6ms - 0b
// ```
var fmt = function(req, res, startTime) {
    var l = util.format(
        '%s %s%s - %s - %d - %dms - %db',
        req.method,
        req.host,
        req.originalUrl,
        req.ip,
        res.statusCode,
        (new Date() - startTime),
        (res._headers['content-length'] || 0),
        (_.any(req.body) ? '\n' + prettyjson.render(req.body) : '')
    );
    return l;
};

// Middleware to wrap each request.
//
// Sets log level based on HTTP status code range.
//
// Also records start time for each request.
logger.requestLogger = function(req, res, next) {
    var startTime = new Date();
    var logRequest = function() {
        res.removeListener('finish', logRequest);
        res.removeListener('close', logRequest);
        var level;
        if (res.statusCode >= 500) {
            level = logger.error;
        } else if (res.statusCode >= 400) {
            level = logger.warn;
        } else {
            level = logger.info;
        }
        level(fmt(req, res, startTime));
    };
    res.on('finish', logRequest);
    res.on('close', logRequest);
    next();
};

module.exports = logger;
