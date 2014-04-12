var url = require('url')
    , jwt = require('jwt-simple')
    , request = require('request')
    , config = require('../../config');

exports.redirect = function(req, res) {
    var redirectUrl = url.format({
        protocol: 'https',
        host: 'github.com',
        pathname: '/login/oauth/authorize',
        query: { client_id: config.github.clientId }
    });
    res.redirect(redirectUrl);
};

exports.callback = function(req, res, next) {
    request.post({
        url: 'https://github.com/login/oauth/access_token',
        json: true,
        body: {
            client_id: config.github.clientId,
            client_secret: config.github.clientSecret,
            code: req.query.code
        }
    }, function(err, resp, body) {
        if (err) { return next(err); }
        res.redirect(
            url.format({
                pathname: '/login',
                query: { jwt: jwt.encode({
                    github: body.access_token
                }, config.secret)}}));
    });
};
