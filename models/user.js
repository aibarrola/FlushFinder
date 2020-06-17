var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

//SCHEMA SET UP
var userSchema = new mongoose.Schema({
    username: String,
    firstname: String,
    lastname: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);    //adds methods to users 

module.exports = mongoose.model("User", userSchema);