var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	User = require("./models/user"),
    Activity = require("./models/activity"), 
	seedDB = require("./seeds");

// require Routes
var activityRoutes = require("./routes/activities"),
    indexRoutes = require("./routes/index");

// seedDB();
mongoose.connect("mongodb://localhost/campfire");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "cutest dog",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser());

// pass currentUser to every template
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

// use routes
app.use("/", indexRoutes);
app.use("/activities", activityRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
	console.log("Server Has Started");
});

