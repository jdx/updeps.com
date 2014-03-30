'use strict';

exports.callback = function (req, res) {
    console.log(req.params);
    console.log(req.body);
    res.send(400);
};
