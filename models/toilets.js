var mongoose = require("mongoose");

//SCHEMA SET UP
var toiletSchema = new mongoose.Schema({
    name: String,
    address: String,
    image: String,
    type: String

});

module.exports = mongoose.model("Toilet", toiletSchema);