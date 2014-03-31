var pkg = require('../package.json');

module.exports = {
    env: process.env.NODE_ENV || 'development',
    port: 3000,
    app: { name: pkg.name },
    assets: { minify: true },
    db: {
        mongo: { uri: 'mongodb://localhost/contacts' }
    },
    github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
    },

    // config that will be sent to the browser for us in Angular
    public: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID
        }
    }
};
