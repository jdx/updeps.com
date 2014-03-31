'use strict';

var config = require('../../config');

exports.index = function (req, res, next) {
    if (req.path.indexOf('/api') === 0) { next(); }
    else {
        res.render('layout', { config: config });
    }
};
