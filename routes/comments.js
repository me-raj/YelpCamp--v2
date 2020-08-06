var express = require("express");
var router	= express.Router({mergeParams: true});

var Campground  = require("../models/campground");
var Comment 	= require("../models/comment");

var middleware = require("../middleware");



//comments new
router.get("/new", middleware.isLoggedIn,  function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground : campground });
		}
	});
 
});



//comments create
//posting new comment
router.post("/", middleware.isLoggedIn, function(req,res){
	//lookup campground
	Campground.findById(req.params.id, function(err,campground){
		if(err){
			console.log(err);
			// res.redirect("/campgrounds");
		} else {
			
			Comment.create(req.body.comment, function(err,comment){
				if(err){
					console.log(err);
				} else {
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					
					//save comments
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success", "Successfully added comment");
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	}); 

});



//comment edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnwership, function(req,res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		} else{
			res.render("comments/edit", { campground_id: req.params.id, comment: foundComment })
		}
	});
});


//comment update route
router.put("/:comment_id", middleware.checkCommentOwnwership,  function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updateComment){
		if(err){
			res.redirect("back");
		} else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});




// comment Delete route
router.delete("/:comment_id", middleware.checkCommentOwnwership,  function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		} else {
			req.flash("success", "Comment Deleted");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});







//middleware


//coment Owner middleware  





module.exports = router;