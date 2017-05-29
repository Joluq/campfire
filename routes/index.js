var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user");

// root route
router.get("/", function(req, res){
    res.redirect("activities");
});

// AUTH ROUTES 

// show register form
router.get("/register", function(req, res) {
    res.render("register");
});

// handle sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username, email: req.body.email, school: req.body.school});
	User.register(newUser, req.body.password, function(err, user){
		if(err) {
			console.log(err);
			return res.render("register");
		} 
		passport.authenticate("local")(req, res, function(){
			res.redirect("/activities");
		});
	});
});

// show login form 
router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/activities",
		failureRedirect: "/login"
	}), function(req, res){
});

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/activities");
});

// middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	// if user is not logged in, redirects
	res.redirect("/login");
}

module.exports = router;