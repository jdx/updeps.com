'use strict';

var models = require('../models')
    , slugify = require('../lib/slugify');

exports.index = function(req, res, next) {
    models.Example.find(function(err, examples) {
        if (err) { next(err); }
        res.json(examples);
    });
};

exports.show = function(req, res, next) {
    models.Example.findOne({
        slug: req.query.slug
    }, function(err, example) {
        if (err) { next(err); }
        res.json(example);
    });
};

exports.create = function(req, res, next) {
    var example = new models.Example({
        title: req.body.title,
        body: req.body.body,
        slug: slugify(req.body.title)
    });
    example.save(function(err, example) {
        if (err) { next(err); }
        res.json(example);
    });
};
