'use strict';

var db = require('../db');

var schema = db.Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String
});

module.exports = db.model('contact', schema);
