var mongoose 	= require("mongoose");
var Campground 	= require("./models/campground");
var Comment 	= require("./models/comment");

var data = [
{
	name: "clouds Rest",
	image: "http://www.photosforclass.com/download/pixabay-1845906?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104497f9c178a7ecb3bd_960.jpg&user=Pexels",
	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
}, 

{
	name: "Night camp",
	image: "https://pixabay.com/get/e83db7072ef6053ed1584d05fb1d4e97e07ee3d21cac104497f9c178a7ecb3bd_340.jpg",
	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
}, 

{
	name: "Canyon floor",
	image: "http://www.photosforclass.com/download/pixabay-1851092?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104497f9c178a7ecb3bd_960.jpg&user=Pexels",
	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
}

]





function seedDB(){

Campground.remove({},function(err){
	if (err){
		console.log(err);
	}
	console.log("removed Campground!");

		//add few campgrounds
	data.forEach(function(seed){
		Campground.create(seed,function(err,campground){
			if(err) {
				console.log(err);
			} else{
				console.log("added a camp");


				//create comment
				Comment.create(
				{
					text: "This place is great, but internet needed!",
					author: "Homer"
				}, function( err,comment){
					if (err){
						console.log(err);
					} 
					else {
						campground.comments.push(comment);
						campground.save();
						console.log("Created new comment");
					}
				});	
				
			}
		});
	});
});


	//add comments

}

module.exports = seedDB;