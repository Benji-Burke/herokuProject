const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subPost= Schema({
    name: { type: String, required: true},
    content: { type: String, required: true},
    tags: { type: [String], required: true},
    author: { type: String, require: true},
    date: { type: String, require:true}
})

const Sub = mongoose.model('Sub', subPost);

module.exports = Sub;