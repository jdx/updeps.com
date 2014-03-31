'use strict';

var request = require('request')
    , config = require('../../config');

exports.oauth = function (req, res, next) {
    request.post({
        url: 'https://github.com/login/oauth/access_token',
        json: true,
        body: {
            'client_id': config.github.clientId,
            'client_secret': config.github.clientSecret,
            'code': req.body.code
        }
    }, function(err, response, body) {
        if (err) { next(err); }
        res.status(response.statusCode).send(body);
    });
};
