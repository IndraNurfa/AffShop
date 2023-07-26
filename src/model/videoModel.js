const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    like: [{
        type: String
    }]
});

module.exports = mongoose.model('Video', videoSchema);