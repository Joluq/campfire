// runs every time server starts
var mongoose = require("mongoose"),
	Activity = require("./models/activity");

var data = [
    {title: "Watch Game of Thrones at CSE auditorium", author:"mona", image: "", date: Date(), location: "UW", ppl_limit: "10"},
    {title: "Grab coffee on the ave", author:"", image: "", date: "", location: "UW", ppl_limit: "4"},
    {title: "Go fishing/karaoke with awesome people", author:"", image: "", date: "", location: "UW", ppl_limit: "5"}
];

// this func will be exported out
function seedDB(){
	Activity.remove({}, function(err){
		// if(err) {
		// 	console.log(err);
		// } 
		// console.log("removed all campgrounds");
		// // add a few campgrounds after removing existing campgrounds
		// data.forEach(function(seed){
		// 	Activity.create(seed, function(err, data){
		// 		if(err) {
		// 			console.log(err);
		// 		} else {
		// 			console.log("added an activity");
		// 		}
		// 	});
		// });
	});
	// add a few comments
}

module.exports = seedDB;
