var Toilet = require("../models/toilets");
var Review = require("../models/review");

middlewareObj = {};

//check if a user is logged in 
middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please login first!");
    res.redirect("/login");
}

//check toilet ownership
middlewareObj.checkToiletOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Toilet.findById(req.params.id, function(err, foundToilet){
            if(err){
                console.log("toilet not found")
                res.redirect("back");
            }else{
                //check if user owns toilet
                if(foundToilet.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You are not authorized to do that!");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "Please login first!");
        res.redirect("back");
    }
}

//check review ownership

middlewareObj.checkReviewOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Review.findById(req.params.review_id, function(err, foundReview){
            if(err){
                res.redirect("back");
            }else{
                //check if user own review
                if(foundReview.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You are not authorized to do that!");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "Please login first!");
        res.redirect("back");
    }
}

module.exports = middlewareObj