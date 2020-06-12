const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: 'Modestack-blog'
    },
    body: {
        type: String,
        required: true,
        default: 'This is blog body'
    },
    author: {
        type: String,
        required: true,
        default: 'abhinash'
    }
});
module.exports = mongoose.model('article', articleSchema);