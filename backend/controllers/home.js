'use strict';

var config = require('../../config');

exports.index = function(req, res) {
    res.render('app', { config: config });
};
