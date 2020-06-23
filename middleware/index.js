var Toilet = require("../models/toilets");
var Review = require("../models/review");

middlewareObj = {};

//check if a user is logged in 
middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
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
                    console.log("does not own toilet")
                    res.redirect("back");
                }
            }
        });
    }else{
        console.log("you need to be logged in ");
        res.redirect("back");
    }
}

module.exports = middlewareObj