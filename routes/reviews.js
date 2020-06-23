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

//DELETE Review
router.delete("/:review_id", function(req,res){
    Review.findByIdAndRemove(req.params.review_id, function(err){
        if(err){
            res.redirect("/toilets");
        }else{
            res.redirect("/toilets/" + req.params.id);
        }
    });
});

//EDIT Review Form 
router.get("/:review_id/edit", function(req,res){
    Review.findById(req.params.review_id, function(err, foundReview){
        if(err){
            res.redirect("back");
        }else{
            res.render("reviews/edit", {toilet_id: req.params.id, review: foundReview})
        }
    });
});

//UPDATE Review

router.put("/:review_id", function(req,res){
    Review.findByIdAndUpdate(req.params.review_id, req.body.review, function(err, updatedReview){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/toilets/" + req.params.id);
        }
    });
});

module.exports = router;