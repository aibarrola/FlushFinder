var express         =require('express'),
    app             =express(),
    bodyParser      =require('body-parser'),
    mongoose        =require('mongoose'),
    passport        =require("passport"),
    LocalStrategy   =require("passport-local"),
    Toilet          =require('./models/toilets'),
    User            =require('./models/user'),
    seedDB          =require('./seed')



//connect to the database
mongoose.connect("mongodb://localhost/flushfinder", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

//check if there is an error connecting to the server
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error:'));
db.once('open', function () {
  console.log("Database is connected!");
});


app.use(bodyParser.urlencoded({extended: true}));    //use body parser
app.set('view engine', 'ejs');                      //put .ejs at the end of file
app.use(express.static(__dirname + "/public"));     //be able to access public static files ex. .css and .js

//Passport configuration

app.use(require("express-session")({
    secret: "this-is-my-secret-key",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
})

seedDB() //Add toilets to the database


//toilet index
app.get("/", function(req,res){
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
app.get("/new",isLoggedIn, function(req,res){
    res.render("toilets/new");
});

//POST toilet form
app.post("/",isLoggedIn, function(req,res){
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
app.get("/toilets/:id", function(req,res){
    //find toilet with the provided ID
    Toilet.findById(req.params.id, function(err,foundToilet){
        if(err){
            console.log(err);
        }else{
            console.log(foundToilet);
            res.render("toilets/show",{toilet: foundToilet});
        }
    })
});

//show register form
app.get("/register", function(req,res){
    res.render("register");
});

//POST register logic
app.post("/register",function(req,res){
    var newUser = {username: req.body.username, firstname:req.body.firstname, lastname:req.body.lastname};
    User.register(newUser, req.body.password, function(err,newUser){
        if(err){
            console.log(err);
            return res.render("register")
        }
        passport.authenticate("local")(req,res,function(){
        console.log(newUser);
        res.redirect("/login");
        })

    })
})

//show login form
app.get("/login", function(req,res){
    res.render("login");
});

//POST login logic
app.post("/login",passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login"       
    }), function(req,res){
});

app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
})




//For all invalid URLS
app.get("*", function(req,res){
    res.send("Invalid ULR BITCH!");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

//Start the server
var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("FlushFinder Server has started!");
})


