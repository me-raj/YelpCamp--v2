var Campground = require("../models/campground");
var Comment = require("../models/comment");
// all middleware goes here
var middlewareObj = {};



middlewareObj.checkCampgrounOwnwership = function(req,res,next){
		if(req.isAuthenticated()){

			Campground.findById(req.params.id, function(err, foundCampground ){
			if(err){
				req.flash("error", "Campgrond not found");
				res.render("back");
			} else {

				//does user own the campground
				if(foundCampground.author.id.equals(req.user._id)){
					next();

				} else {
						req.flash("error", "You don't have the permission!");
						res.redirect("back"); 

				}
				
			}
			});

	} else{

		req.flash("error", "You need to be logged in!");
		res.redirect("back");

	}
}



//middleware for comment owner permission
middlewareObj.checkCommentOwnwership = function(req,res, next){

		if(req.isAuthenticated()){

			Comment.findById(req.params.comment_id, function(err, foundComment ){
			if(err){
				res.render("back");
			} else {

				//does user own the comment
				if(foundComment.author.id.equals(req.user._id)){
					next();

				} else {

						req.flash("error", "You don't have permission!");
						res.redirect("back"); 

				}
				
			}
			});

	} else{
		//if not logged in - the flash message to log him in
		req.flash("error", "You need to be logged in!");

		res.redirect("back");

	}
}



middlewareObj.isLoggedIn = function (req,res,next){
	if (req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in!");
	res.redirect("/login");
}


module.exports = middlewareObj;

	

