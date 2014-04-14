var db = require('../mongo');

var schema = db.Schema({
  name: String,
  github: String,
  version: String
});

module.exports = db.model('repositories', schema);
