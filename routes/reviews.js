var express = require("express");
var router = express.Router({mergeParams:true});
var passport = require("passport");
var User = require("../models/user");
var Toilet = require("../models/toilets");
var Review = require("../models/review");
var middleware = require("../middleware");


//show review form
router.get("/new",middleware.isLoggedIn, function(req,res){
    //find toilet by id
    Toilet.findById(req.params.id, function(err, toilet){
        if(err){
            console.log(err);
        }else{
            res.render("reviews/new", {toilet: toilet});
        }
    })
})

//Review create 
router.post("/",middleware.isLoggedIn, function(req,res){
    Toilet.findById(req.params.id, function(err, toilet){
        if(err){
            console.log(err);
            res.redirect("/");
        }else{
            //create new comment
            Review.create(req.body.review, function(err, review){
                if(err){
                    console.log(err);
                    res.redirect("/");           
                }else{
                    //add username and id to comment
                    review.author.id = req.user._id;
                    review.author.firstname = req.user.firstname;
                    review.save();
                
                    //add review to toilet 
                    toilet.reviews.push(review);
                    toilet.save();
                    res.redirect('/toilets/' + toilet._id);
                }
            })
        }
    })
})


module.exports = router;