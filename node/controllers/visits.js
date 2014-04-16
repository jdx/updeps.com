var di = require('di')
  , Repository = require('../models/repository')
  , NpmService = require('../services/npm');

var VisitsController = function(NpmService) {
  return {
    create: function(req, res) {
      res.send(201);
      var name = req.body.repo.split('/', 2)[1];
      NpmService.findByName(name, function(err, pkg) {
        var github;
        if (!pkg) return;
        if (pkg.repository) {
          github = pkg.repository.url.split('github.com/').pop().split('.git', 1)[0];
        }
        Repository.update({name: pkg.name}, {
          name: pkg.name,
          github: github,
          version: pkg['dist-tags'].latest
        }, {upsert: true}, function(err) {
          if (err) throw err;
          console.log('added', pkg.name);
        });
      });
    }
  };
};

di.annotate(VisitsController, new di.Inject(NpmService));

module.exports = VisitsController;
