const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
    name: String,
    size: String,
    key: String,
    url: String,
    createdAt: {
      type: Date,
      default: Date.now,
    }
});

module.exports = model('Post', PostSchema);
