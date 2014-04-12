// # Model index

// Example:
// ```javascript
// exports.user = require('./user');
// ```
//
// Then in `user.js`:
// ```javascript
// var db = require('../db');
// var schema = db.Schema({
//     name: String,
//     email: String
// });
// module.exports = db.model('example', schema);
// ```
