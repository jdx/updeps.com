var di = require('di')
  , should = require('should')
  , MockNpm = require('../mocks/npm')
  , NpmController = require('../../controllers/npm');

var injector = new di.Injector([MockNpm]);
var controller = injector.get(NpmController);

describe("NPM Controller", function() {
  it("Returns a node module", function(done) {
    var req = { params: {name: 'foo'} };
    var res = {
      json: function(obj) {
        should(obj).have.property('name', 'foo');
        done();
      }
    };
    controller.lookup(req, res);
  });
});
