var mongoose = require("mongoose");
var Schema = mongoose.Schema

var Article = new Schema({
    title: String,
    author: String,
    body: String,
    link: String,
});