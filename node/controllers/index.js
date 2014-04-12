// # Controller index

// Load controllers here
//
// Example:
// ```javascript
// exports.users = require('./users');
// ```

exports.github = require('./github');


// Show API endpoint index
exports.index = function(req, res) {
    res.json({
        // Example:
        // ```javascript
        // current_user_url: 'https://api.meanframework.com/users'
        // ```
    });
};
