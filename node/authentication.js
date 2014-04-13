var jwt = require('jwt-simple')
    , config = require('../config');

module.exports = function() {
    return function(req, res, next) {
        var header = req.headers.authorization;
        if (header) {
            header = header.split(' ', 2);
            var token = header[1];
            req.auth = jwt.decode(token, config.secret);
        }
        return next();
    }
};
