const jwt = require('jsonwebtoken');
const config = require('../config.json');

const User = require("../models/user");

const authenticate = async ({ email, password }) => {
    const user = await User.findOne({ email, password });

    if (!user) throw 'Username or password is incorrect';

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });

    return {
        ...omitPassword(user._doc),
        token
    };
}

const getAll = async () => {
    const users = await await User.find();
    return users.map(u => omitPassword(u));
}


const register = async ({ email, password }) => {
    // check if user exists
    const userRes = await User.findOne({ email });
    console.log(userRes)
    if (userRes) {
        throw {
            name: "DuplicateUserNameError",
            message: 'Email id already exists!'
        };
    }

    // If it reaches this line means user does not exist
    // Let's create one.

    const user = new User({ email, password });
    const createdUser = await user.save();

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
    return {
        ...omitPassword(createdUser._doc),
        userId: createdUser._id,
        token: token
    }
}

// helper functions
const omitPassword = (user) => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

module.exports = { authenticate, getAll, register }