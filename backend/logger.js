'use strict';

var _ = require('lodash'),
    fs = require('fs'),
    logger = require('winston'),
    expressWinston = require('express-winston'),
    config = require('../config');

fs.mkdir('logs', function() {});
logger.add(logger.transports.File, { filename: _.template('logs/<%= env %>.log', { env: config.env })});

logger.ErrorLogger = expressWinston.errorLogger({
    transports: [
        new logger.transports.Console({
            colorize: true
        })
    ]
});

logger.RequestLogger = expressWinston.logger({
    transports: [
        new logger.transports.Console({
            colorize: true
        })
    ]
});

module.exports = logger;
