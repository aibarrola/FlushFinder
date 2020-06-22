var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Toilet = require("../models/toilets");

//toilet index
router.get("/", function(req,res){
    //get toilets from DB
    Toilet.find({}, function(err, allToilets){
        if(err){
            console.log(err);
        }else{
            res.render("toilets/index", {toilets: allToilets});
        }
    })
});

//show register form
router.get("/register", function(req,res){
    res.render("register");
});

//POST register logic
router.post("/register",function(req,res){
    var newUser = {username: req.body.username, firstname:req.body.firstname, lastname:req.body.lastname};
    User.register(newUser, req.body.password, function(err,newUser){
        if(err){
            console.log(err);
            return res.render("register")
        }
        passport.authenticate("local")(req,res,function(){
        console.log(newUser);
        res.redirect("/toilets");
        })

    })
})

//show login form
router.get("/login", function(req,res){
    res.render("login");
});

//POST login logic
router.post("/login",passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login"       
    }), function(req,res){
});

//logout logic 
router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
})

//For all invalid URLS
router.get("*", function(req,res){
    res.send("Invalid ULR BITCH!");
});

module.exports = router;