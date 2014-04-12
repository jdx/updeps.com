//# Production configuration
//
// Config used in production environments. Inherits from [base config](base.html).
//
// Use this config by setting `NODE_ENV` envionment variable to `production`.
//
// Copy this file to `staging.js` for a staging config.

module.exports = {
    assets: { cache: true, minify: true }
};
