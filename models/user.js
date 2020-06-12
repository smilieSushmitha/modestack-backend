const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        default: 'test@gmail.com'
    },
    password: {
        type: String,
        required: true,
        default: 'Modestack@123'
    }
});

module.exports = mongoose.model('user', userSchema);