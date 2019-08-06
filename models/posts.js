const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = Schema({
    name: { type: String, required: true},
    content: { type: String, required: true},
    tags: { type: [String], required: true},
    author: { type: String, require: true},
    date: { type: String, require:true}
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;