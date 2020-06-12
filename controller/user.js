const User = require("../models/user.js");

// To Create an user
exports.createUser = (req, res, next) => {
    // Log This Request
    console.log(
        (new Date()).toISOString(),
        req.method,
        req.baseUrl
    );

    // Create a new user object
    // req.body should strictly follow User Model
    const user = new User(req.body);

    // Save the object as document in MongoDb
    user.save()
        .then(
            createdUser => {
                res.status(201).json({
                    'status': 'Success',
                    'message': 'User added SuccessFully!',
                    'article': {
                        ...createdUser._doc,
                        userId: createdUser._id
                    }
                })
            }
        )
        .catch(
            error => {
                res.status(500).json({
                    'status': 'Error',
                    'message': 'Error in DB Operation!',
                    'error': error
                });
            }
        )
}