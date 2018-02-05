var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var Article = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
});