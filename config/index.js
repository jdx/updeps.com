'use strict';

var  _ = require('lodash');

var baseConfig = require('./base'),
    envConfig  = require('./' + baseConfig.env + '.js');

module.exports = _.extend(baseConfig, envConfig);
