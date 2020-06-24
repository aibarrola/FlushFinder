var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Toilet = require("../models/toilets");
var Review = require("../models/review");
var middleware = require("../middleware");


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
            req.flash("error", err.message);
            return res.redirect("/register")
        }
        passport.authenticate("local")(req,res,function(){
        console.log(newUser);
        req.flash("success", "Welcome to FlushFinder," + user.firstname);
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
    req.flash("success", "Successfully logged out!");
    res.redirect("/");
})

router.get("/profile",middleware.isLoggedIn,function(req,res){
    Toilet.find(req.params.id, function(err, allToilet){
        if(err){
            res.redirect("back");
        }else{
            Review.find(req.params.id, function(err, allReview){
                if(err){
                    res.redirect("back");
                }else{
                    res.render("profile", {toilets:allToilet, reviews:allReview})
                }
            })
        }
    })
});

//For all invalid URLS
router.get("*", function(req,res){
    res.send("Invalid ULR BITCH!");
});

module.exports = router;