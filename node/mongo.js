// # MongoDB configuration

var mongoose = require('mongoose')
  , config = require('../config')
  , logger = require('./logger');

// Use mongo [configuration setting](../config/base.html).
mongoose.connect(config.mongo.uri);

mongoose.connection.once('open', function () {
  logger.info('Connected to mongodb at %s', config.mongo.uri);
});

module.exports = mongoose;
