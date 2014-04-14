var request = require('request');

var NpmService = function() {};

NpmService.prototype.findByName = function(name, cb) {
  request.get({
    url: 'https://fullfatdb.npmjs.com/registry/' + name,
    json: true
  }, function(err, res, body) {
    if (err) cb(err);
    else if (res.statusCode === 404) cb(null, null);
    else cb(null, body);
  });
};

module.exports = NpmService;
