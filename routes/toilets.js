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


//show add toilet form
router.get("/new",isLoggedIn, function(req,res){
    res.render("toilets/new");
});

//POST toilet form
router.post("/",isLoggedIn, function(req,res){
    //take the info from the form
    var name = req.body.name;
    var image = req.body.image;
    var address = req.body.address;
    var type = req.body.type;
    var toilet = req.body.toilet;
    var urinal = req.body.urinal;
    var sink = req.body.sink;
    var male = req.body.male;
    var female = req.body.female;
    var newtoilet = {name:name, image:image, type:type, address:address, toilet:toilet, urinal:urinal, sink:sink, male: male, female: female};
    //create a new campground and save to DB
    Toilet.create(newtoilet, function(err,newtoilet){
        if(err){
            console.log(err);
        }else{
            console.log(newtoilet)
            res.redirect("/")
        }
    })
});


//SHOW more info about SPECIFIC toilet 
router.get("/:id", function(req,res){
    //find toilet with the provided ID
    Toilet.findById(req.params.id).populate("reviews").exec(function(err,foundToilet){
        if(err){
            console.log(err);
        }else{
            console.log(foundToilet);
            res.render("toilets/show",{toilet: foundToilet});
        }
    })
});


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;