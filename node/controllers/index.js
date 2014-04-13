// # Controller index

// Load controllers here
//
// Example:
// ```javascript
// exports.users = require('./users');
// ```

exports.github = require('./github');
exports.repositories = require('./repositories');
exports.npm = require('./npm');

// Show API endpoint index
exports.index = function(req, res) {
    res.json({
        repositories_url: 'https://updeps.com/v1/repositories',
        repositories_search_url: 'https://updeps.com/v1/repositories/search?q={query}{&per_page}'
    });
};
