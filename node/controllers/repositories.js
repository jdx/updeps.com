var lodash = require('lodash')
  , Repository = require('../models/repository')
  , request = require('request');

var RepositoriesController = function() {};

RepositoriesController.prototype.search = function(req, res, next) {
  if (!req.auth || !req.auth.github) { return res.send(401); }
  request.get({
    url: 'https://api.github.com/search/repositories',
    json: true,
    qs: {
      q: req.query.q,
      per_page: req.query.per_page || 100,
      in: 'name',
      access_token: req.auth.github
    },
    headers: { 'User-Agent': 'updeps' }
  }, function(err, resp, body) {
    if (err) { return next(err); }
    body.items = body.items || [];
    var repos = body.items.map(function(r) {
      return {
        url: r.url,
        name: r.name,
        full_name: r.full_name,
        owner: r.owner.login,
        language: r.language,
        stargazers_count: r.stargazers_count,
        forks_count: r.forks_count
      };
    });
    res.json(repos);
  });
};

RepositoriesController.prototype.index = function(req, res) {
  Repository.find(function(err, repos) {
    res.json(repos);
  });
};

RepositoriesController.prototype.show = function(req, res, next) {
  var github = req.params.author + '/' + req.params.repo;
  Repository.findOne({github: github}, function(err, repo) {
    if (err) return next(err);
    res.json(repo);
  });
};

module.exports = RepositoriesController;
