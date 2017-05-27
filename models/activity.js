var mongoose = require("mongoose");

var activitySchema = new mongoose.Schema({
    title: String,
    image: String,
    date: Date,
    time: String,
    author: {
        id: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User"
        },
        username: String
    },
    location: String,
    ppl_limit: Number,
    description: String
});

module.exports = mongoose.model("Activity", activitySchema);