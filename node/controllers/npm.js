var di = require('di')
  , Repository = require('../models/repository')
  , NpmService = require('../services/npm');

var NpmController = function(npmService) {
  this.npmService = npmService;
};

NpmController.prototype.lookup = function(req, res, next) {
  this.npmService.findByName(req.params.name, function(err, pkg) {
    if (err) return next(err);
    if (!pkg) return res.send(404);
    var github;
    if (pkg.repository) {
      github = pkg.repository.url.split('github.com/').pop().split('.git', 1)[0];
    }
    Repository.update({name: pkg.name}, {
      name: pkg.name,
      github: github,
      version: pkg['dist-tags'].latest
    }, {upsert: true}, function(err) {
      if (err) return next(err);
      res.json(pkg);
    });
  });
};

di.annotate(NpmController, new di.Inject(NpmService));

module.exports = NpmController;
