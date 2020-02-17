const { Schema, model } = require('mongoose');

const StartupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    },
    categories: [{
        type: String,
        required: true,
    }],
    jobs: [{
        type: String,
        required: true,
    }],
    responsible: [{
        type: String,
        ref: 'User'
    }],
    applies: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = model('Startup', StartupSchema);