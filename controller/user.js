const User = require("../models/user");
const userService = require("../services/user");

// Authenticate a User
exports.authenticate = (req, res, next) => {
    // Log This Request
    console.log(
        (new Date()).toISOString(),
        req.method,
        req.baseUrl
    );

    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}


exports.getAll = (req, res, next) => {
    // Log This Request
    console.log(
        (new Date()).toISOString(),
        req.method,
        req.baseUrl
    );

    userService.getAll()
    .then(users => res.json(users))
    .catch(next)
}

// To Create an user
exports.createUser = (req, res, next) => {
    // Log This Request
    console.log(
        (new Date()).toISOString(),
        req.method,
        req.baseUrl
    );

    userService.register(req.body)
        .then(user => res.json(user))
        .catch(next);
}