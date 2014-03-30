var  _ = require('lodash');

var baseConfig = require('./base'),
    envConfig  = require('./' + baseConfig.env);

module.exports = _.extend(baseConfig, envConfig);
