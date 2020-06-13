const User = require("../models/user.js");
var crypto = require('crypto');

// To Create an user
exports.register = async (req, res, next) => {
    // Log This Request
    console.log(
        (new Date()).toISOString(),
        req.method,
        req.baseUrl
    );

    // Create a new user object
    // req.body should strictly follow User Model
    const user = new User(req.body);

    try {
        // check if user exists
        const userRes = await User.find({
            email: user.email
        });
        if (userRes.length) {
            return res.status(409).json({
                'status': 'Error',
                'message': 'Email id already exists!'
            });
        }

        // If it reaches this line means user does not exist
        // Let's create one.

        const createdUser = await user.save();
        return res.status(201).json({
            'status': 'Success',
            'message': 'User added SuccessFully!',
            'article': {
                ...createdUser._doc,
                userId: createdUser._id
            }
        })

    } catch (error) {
        // Catch all generic errors
        console.error("Something's Wrong!", error);
        return res.status(500).json({
            'status': 'Error',
            'message': 'Error in DB Operation!',
            'error': error
        });
    }

}