var di = require('di')
  , NpmService = require('../../services/npm');

var MockNpm = function() {};

MockNpm.prototype.findByName = function(name, cb) {
  cb(null, {name: name, 'dist-tags': { latest: '1.0.0' }});
};

di.annotate(MockNpm, new di.Provide(NpmService));

module.exports = MockNpm;
