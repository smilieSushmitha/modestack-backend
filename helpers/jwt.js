const expressJwt = require('express-jwt');
const config = require('../config.json');

const jwt = () => {
    const { secret } = config;
    return expressJwt({ secret }).unless({
        path: [
            // public routes that don't require authentication
            '/api/v1/user/login',
            '/api/v1/user/register',
        ]
    });
}

module.exports = { jwt }