const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        default: 'Modestack-blog'
    },
    password: {
        type: String,
        required: true,
        default: 'This is blog body'
    }
});

module.exports = mongoose.model('user', userSchema);