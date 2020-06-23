var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Toilet = require("../models/toilets");
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


//show add toilet form
router.get("/new",middleware.isLoggedIn, function(req,res){
    res.render("toilets/new");
});

//POST toilet form
router.post("/",middleware.isLoggedIn, function(req,res){
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
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newtoilet = {name:name, image:image, type:type, address:address, toilet:toilet, urinal:urinal, sink:sink, male: male, female: female, author: author};
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

//DELETE toilet

router.delete("/:id",middleware.checkToiletOwnership, function(req,res){
    Toilet.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/toilets");
        }
    })
})


//EDIT toilet form

router.get("/:id/edit",middleware.checkToiletOwnership, function(req,res){
    Toilet.findById(req.params.id, function(err, foundToilet){
        res.render("toilets/edit", {toilet: foundToilet}); 
    });
});

//UPDATE toilet

router.put("/:id",middleware.checkToiletOwnership, function(req,res){
    //find and update the correct toilet
    Toilet.findByIdAndUpdate(req.params.id, req.body, function(err, updatedToilet){
        if(err){
            res.redirect("/toilets");
        }else{
            res.redirect("/toilets/" + req.params.id);
        }
    })
})


module.exports = router;