//# Config loader
//
// This script loads the environment config,
// then merges it with the [base config](base.html).
//
// Settings in an environment file will override the base settings.
//
// Environment files:
// * [development](development.html)
// * [production](production.html)

var  _ = require('lodash');

// Load [base config](base.html).
var baseConfig = require('./base');

// Find environment based on `baseConfig.env`.
var envConfig  = require('./' + baseConfig.env);

// Merge [base config](base.html) with environment config.
module.exports = _.merge(baseConfig, envConfig);
