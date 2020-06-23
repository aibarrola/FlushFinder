var mongoose = require("mongoose");

//SCHEMA SET UP
var toiletSchema = new mongoose.Schema({
    name: String,
    address: String,
    image: String,
    type: String,

    toilet: Number,
    urinal: Number,
    sink: Number,

    male: String,
    female: String,

    handicap: String,
    
    author:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },

    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ]

});

module.exports = mongoose.model("Toilet", toiletSchema);