// # Controller index

// Load controllers here
//
// Example:
// ```javascript
// exports.users = require('./users');
// ```

exports.github = require('./github');
exports.search = require('./search');

// Show API endpoint index
exports.index = function(req, res) {
    res.json({
        search_url: 'https://updeps.com/v1/search?q={query}{&per_page}'
    });
};
