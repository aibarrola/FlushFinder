var mongoose = require("mongoose");
var Toilet = require("./models/toilets");
var User = require("./models/user");
var Review = require("./models/review");


var data = [
    {
        name: "Golden Toilet",
        image: "https://i.guim.co.uk/img/media/d5594c4e7b9ed46575bcb80c4d47344218041088/0_325_7710_4626/master/7710.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=86fde43ee0e62239558b4cb23224dcd4",
        address: "1200 Richmain St.",
        type: "Public",
        toilet: 1,
        urinal: 0,
        sink: 3,
        male: "male",
        female: "",
        handicap: "handicap"
    },
    {
        name: "KFC Toilet",
        image: "https://www.signaturehardware.com//media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/4/7/475511-two-piece-elongated-toilet_1.jpg",
        address: "900 Monroe St.",
        type: "Public",
        toilet: 2,
        urinal: 2,
        sink: 2,
        male: "male",
        female: "female",
        handicap: "handicap"

    },
    {
        name: "Angelo's Toilet",
        image: "https://secure.img1-fg.wfcdn.com/im/19098011/resize-h600-w600%5Ecompr-r85/8863/88634490/Drake%C2%AE+Two-Piece+Elongated+Dual+Flush+1.6+and+0.8+GPF+Universal+Height+Dynamax+Tornado+Flush%C2%AE+Toilet+With+CEFIONTET%C2%AE+With+Toilet+Seat+and+Toilet+Mounting+Bolts.jpg",
        address: "2000 Main St.",
        type: "Private",
        toilet: 1,
        urinal: 0,
        sink: 1,
        male: "male",
        female: "",
        handicap: ""

    }

]

function seedDB(){
    //Remove all toilets
    Toilet.deleteMany({}, function(err){
         if(err){
             console.log(err);
         }
         console.log("removed toilets!");
         //Remove all reviews
         Review.deleteMany({}, function(err) {
             if(err){
                 console.log(err);
             }
             console.log("removed reviews!");
              //add a few toilets
             data.forEach(function(seed){
                 Toilet.create(seed, function(err, toilet){
                     if(err){
                         console.log(err)
                     } else {
                         console.log("added a toilet");
                         //create a comment
                        //  Review.create(
                        //      {
                        //          text: "it stinks",
                        //          author: "angelo"
                        //      }, function(err, review){
                        //          if(err){
                        //              console.log(err);
                        //          } else {
                        //              toilet.reviews.push(review);
                        //              toilet.save();
                        //              console.log("Created new review");
                        //          }
                        //      });
                     }
                 });
             });
         });
     }); 
 }
  
 module.exports = seedDB;