var di = require('di')
  , NpmService = require('../../services/npm');

var MockNpm = function() {};

MockNpm.prototype.findByName = function(name, cb) {
  cb(null, {name: name});
};

di.annotate(MockNpm, new di.Provide(NpmService));

module.exports = MockNpm;
