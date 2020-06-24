var express         =require('express'),
    app             =express(),
    bodyParser      =require('body-parser'),
    mongoose        =require('mongoose'),
    flash           =require('connect-flash'),
    passport        =require("passport"),
    LocalStrategy   =require("passport-local"),
    methodOverride  =require("method-override"),
    Toilet          =require('./models/toilets'),
    User            =require('./models/user'),
    Review          =require('./models/review')
    seedDB          =require('./seed')

//requiring routes

var indexRoutes     =require("./routes/index"),
    toiletRoutes    =require("./routes/toilets"),
    reviewRoutes    =require("./routes/reviews");




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
app.use(methodOverride("_method"));                 //use method override 
app.use(flash());                                   //use connect-flash 

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
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

//seedDB() //Deletes all toilets&Reviews, then Add toilets to the database


//Using Routes
app.use("/toilets", toiletRoutes);
app.use("/toilets/:id/reviews", reviewRoutes);
app.use("/", indexRoutes);


//Start the server
var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("FlushFinder Server has started!");
})
