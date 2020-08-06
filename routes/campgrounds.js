var express = require("express");
var router	= express.Router();

var Campground = require("../models/campground");

var middleware = require("../middleware");


//Index - show all camps
router.get("/",function(req,res){
		//getting data from DB
		Campground.find({}, function(err,allCampground){
			if(err){
			console.log(err);
			} else {
			res.render("campgrounds/index", { campgrounds: allCampground });
			}
		});
	});
	


// Create route-- Campground route
router.post("/", middleware.isLoggedIn,  function(req,res){
	var name			= req.body.name;
	var price			= req.body.price;
	var image 			= req.body.image;
	var desc 			= req.body.description;
	var comment 		= req.body.comment;
	var author			= {
		id: req.user._id,
		username: req.user.username
	}

	var newCampground 	= {name:name, price: price,  image:image, description: desc, author: author }

	Campground.create(newCampground, function(err,newlyCreated){
		if (err){
			console.log(err);
		} else{
			res.redirect("/campgrounds");
		}
	});

});


//new route
router.get("/new", middleware.isLoggedIn, function(req,res){
	res.render("campgrounds/new");
});



//show route 
router.get("/:id",function(req,res){


	//find the comment with id and show it  
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if (err){
			console.log(err);
		} else {

			console.log(foundCampground);
			res.render("campgrounds/show", {campground : foundCampground});
		}
	});
});



//edit campground route
router.get("/:id/edit", middleware.checkCampgrounOwnwership,  function(req,res){
	Campground.findById(req.params.id, function(err, foundCampground ){
		res.render("campgrounds/edit", { campground : foundCampground }); //foundCampground ta campground nam er under e pass hocche edit.ejs e
		});

});


 
 //update campground route

router.put("/:id", function(req,res){
	//find and update correct cammp
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
	
});


//Destroy camp route
router.delete("/:id", middleware.checkCampgrounOwnwership,  function(req,res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds");
		}
	})
});


//middleware for Authentication





module.exports = router; 
