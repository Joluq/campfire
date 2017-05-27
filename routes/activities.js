var express = require("express"),
    router = express.Router(),
    Activity = require("../models/activity");

// INDEX - show all activities
router.get("/", function(req, res){
    Activity.find({}, function(err, allActivities){
        if(err){
            console.log(err);
        } else {
            res.render("activities/index", {activities: allActivities, currentUser: req.user});
        }
    });
});

// NEW - show form to create new activity 
router.get("/new", isLoggedIn, function(req, res) {
    res.render("new");
});

// CREATE - add new activity to db
router.post("/", isLoggedIn, function(req, res){
   var title = req.body.title;
   var image = req.body.image;
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   var ppl_limit = req.body.ppl_limit;
   var date = req.body.date;
   var time = req.body.time;
   var location = req.body.location;
   var description = req.body.description;
   console.log(req.user);
   var newActivity = {title: title, image: image, date: date, time: time, location: location, ppl_limit: ppl_limit, author: author, description: description };
   Activity.create(newActivity, function(err, newlyCreated){
       if(err){
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.redirect("/activities");
        }
   })
});

// EDIT - show form to edit activity
router.get("/:id/edit", checkActivitiesOwnership, function(req, res){
    Activity.findById(req.params.id, function(err, foundActivity){
        if(err){
            res.redirect("/activities");
        } else {
            res.render("activities/edit", {activity: foundActivity});
        }
    });
});

// UPDATE - update activity 
router.put("/:id", checkActivitiesOwnership, function(req, res){
    Activity.findByIdAndUpdate(req.params.id, req.body.activity, function(err, updatedActivity){
        if(err){
            res.redirect("/activities");
        } else {
            console.log(req.body.activity);
            res.redirect("/activities");
        }
    });
});

// DESTROY activity Route
router.delete("/:id", checkActivitiesOwnership, function(req, res){
	Activity.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/activities");
		} else {
			res.redirect("/activities");
		}
	});
});

// middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	// if user is not logged in, redirects
	res.redirect("/login");
}

function checkActivitiesOwnership (req, res, next){
    if(req.isAuthenticated()){
        Activity.findById(req.params.id, function(err, foundActivity){
            if(err){
                res.redirect("back");
            } else {
                if(foundActivity.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.send("You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        res.send("You need to log in to do that");
        res.redirect("back");
    }
}

module.exports = router;