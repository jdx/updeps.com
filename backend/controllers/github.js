'use strict';

var request = require('request')
    , config = require('../../config');

exports.callback = function (req, res, next) {
    var code = req.query.code;
    request.post({
        url: 'https://github.com/login/oauth/access_token',
        json: true,
        body: {
            'client_id': config.github.clientId,
            'client_secret': config.github.clientSecret,
            'code': code
        }
    }, function(err, response, body) {
        if (err) { next(err); }
        else if (body.error) { next(new Error(JSON.stringify(body))); }
        else {
            res.cookie('github_auth_token', body.access_token);
            res.redirect('/');
        }
    });
};
