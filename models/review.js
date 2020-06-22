var mongoose = require("mongoose");

var reviewSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        firstname: String
    }
});

module.exports = mongoose.model("Review", reviewSchema);

