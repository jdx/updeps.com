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
        slug: req.params.id
    }, function(err, example) {
        if (err) { next(err); }
        if (example) { res.json(example); }
        else { res.send(404); }
    });
};

exports.create = function(req, res, next) {
    new models.Example({
        title: req.body.title,
        body: req.body.body,
        slug: slugify(req.body.title)
    }).save(function(err, example) {
        if (err) { next(err); }
        res.json(example);
    });
};

exports.update = function(req, res, next) {
    models.Example.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        body: req.body.body,
        slug: slugify(req.body.title)
    }, function(err, example) {
        if (err) { next(err); }
        res.json(example);
    });
};
