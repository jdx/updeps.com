'use strict';

var _ = require('lodash')
    , util = require('util')
    , fs = require('fs')
    , winston = require('winston')
    , prettyjson = require('prettyjson')
    , config = require('../config');

var logFilename = util.format('logs/%s.log', config.env);

fs.mkdir('logs', function () {});
var logger = new winston.Logger({
    transports: [
        new winston.transports.Console({colorize: true}),
        new winston.transports.File({ filename: logFilename})
    ]
});

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
