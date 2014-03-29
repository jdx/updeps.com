'use strict';

var pkg = require('../package.json');

module.exports = {
    env: process.env.NODE_ENV || 'development',
    port: 3000,
    app: {
        name: pkg.name
    },
    assets: {
        minify: true
    },
    db: {
        mongo: {
            uri: 'mongodb://localhost/contacts'
        }
    }
};
