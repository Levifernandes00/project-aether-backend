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
    }],
    jobs: [{
        type: String,
    }],
    responsible: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    applies: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = model('Startup', StartupSchema);