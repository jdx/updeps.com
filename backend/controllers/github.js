'use strict';

exports.register = function(req, res) {
    res.redirect('https://github.com/login/oauth/authorize');
};

exports.callback = function(req, res) {
    console.log(req.params);
    console.log(req.body);
};
