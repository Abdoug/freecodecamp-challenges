const mongoose = require("mongoose");
const ReplySchema = require("./Reply").ReplySchema;
const { Schema } = mongoose;

const date = new Date();

const ThreadSchema = new Schema({
    text: { type: String },
    delete_password: { type: String },
    created_on: { type: Date, default: date },
    bumped_on: { type: Date, default: date },
    reported: { type: Boolean, default: false },
    replies: { type: [ReplySchema] },
})

const Thread = mongoose.model("Thread", ThreadSchema);

exports.ThreadSchema = ThreadSchema;
exports.Thread = Thread;