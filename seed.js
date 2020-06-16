var mongoose = require("mongoose");
var Toilet = require("./models/toilets");
var User = require("./models/user");


var data = [
    {
        name: "Golden Toilet",
        image: "https://i.guim.co.uk/img/media/d5594c4e7b9ed46575bcb80c4d47344218041088/0_325_7710_4626/master/7710.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=86fde43ee0e62239558b4cb23224dcd4",
        address: "1200 Richmain St.",
        type: "Public"
    },
    {
        name: "KFC Toilet",
        image: "https://www.signaturehardware.com//media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/4/7/475511-two-piece-elongated-toilet_1.jpg",
        address: "900 Monroe St.",
        type: "Public"

    },
    {
        name: "Angelo's Toilet",
        image: "https://images.unsplash.com/flagged/photo-1556438758-84625859c6b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80",
        address: "2000 Main St.",
        type: "Private"

    },

]

function seedDB(){
    //remove all users
    User.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Removing Users...");
    })
    //remove all toilets 
    Toilet.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Removing Toilets...");
        data.forEach(function(seed){
            //add toilets 
            Toilet.create(seed, function(err,toilet){
                if(err){
                    console.log(err)
                }else{
                    console.log("Added a new toilet.");
                }
            })
        })
    })
}

module.exports = seedDB;