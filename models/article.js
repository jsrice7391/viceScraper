const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;


var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
    subText: {
        type: String
    },
    notes: [
    {
      // Store ObjectIds in the array
      type: Schema.Types.ObjectId,
      // The ObjectIds will refer to the ids in the Note model
      ref: "Note"
    }
  ]
});


// Add the Unique validator as a plugin for the mongoose schema
ArticleSchema.plugin(uniqueValidator);



var Article = mongoose.model("Article", ArticleSchema);






module.exports = Article;