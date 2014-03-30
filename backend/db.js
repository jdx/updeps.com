'use strict';

var mongoose = require('mongoose'),
    config = require('../config'),
    logger = require('./logger');

mongoose.connect(config.db.mongo.uri);

mongoose.connection.on('error', function () {
    logger.error('Error connecting to database at %s', config.db.mongo.uri);
});

mongoose.connection.once('open', function () {
    logger.info('Connected to mongodb at %s', config.db.mongo.uri);
});

module.exports = mongoose;
