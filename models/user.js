var mongoose = require("mongoose");

//SCHEMA SET UP
var userSchema = new mongoose.Schema({
    username: String,
    name: String,
    password: String
});

module.exports = mongoose.model("User", userSchema);