const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;


const NoteSchema = new Schema({
    text:{
        type: String,
        required: true
    }

},{
    timestamps:{
        createdAt: "created_at"
    }
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
