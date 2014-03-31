'use strict';

var config = require('../../config')
    , logger = require('../logger')
    , request = require('request')
    , jwt = require('jwt-simple');

exports.getJwt = function(req, res, next) {
    request.get({
        url: 'https://api.github.com/users/dickeyxxx',
        headers: {
            'User-Agent': config.github.name,
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': 'token ' + req.body.github
        }
    }, function(err, response, body) {
        if (err) { next(err); }
        if (response.statusCode !== 200) {
            logger.warn(body);
            return res.status(response.statusCode).json(body);
        }
        res.send(jwt.encode({
            github: body.login
        }, config.secret));
    });
};
