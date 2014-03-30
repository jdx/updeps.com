'use strict';

var models = require('../models');

exports.index = function (req, res, next) {
    models.Contact.find(function (err, contacts) {
        if (err) { next(err); }
        res.json(contacts);
    });
};

exports.create = function (req, res, next) {
    var contact = new models.Contact({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber
    });
    contact.save(function (err, c) {
        if (err) { next(err); }
        res.status(201).json(c);
    });
};

exports.destroy = function (req, res, next) {
    models.Contact.findByIdAndRemove(req.params.id, function (err) {
        if (err) { next(err); }
        res.send(204);
    });
};

exports.update = function (req, res, next) {
    models.Contact.findByIdAndUpdate(req.params.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber
    }, function (err, contact) {
        if (err) { next(err); }
        res.json(contact);
    });
};
