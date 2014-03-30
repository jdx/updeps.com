'use strict';

var db = require('../db');

var schema = db.Schema({
    title: String,
    slug: String,
    body: String
});

module.exports = db.model('example', schema);
