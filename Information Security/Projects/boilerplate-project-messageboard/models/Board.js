const mongoose = require("mongoose");
const ThreadSchema = require("./Thread").ThreadSchema;
const { Schema } = mongoose;

const BoardSchema = new Schema({
    name: { type: String },
    threads: { type: [ThreadSchema] }
})

const Board = mongoose.model("Board", BoardSchema);

exports.Board = Board;