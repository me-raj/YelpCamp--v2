 var express 	= require("express"),
 		app 	= express(),
	 bodyParser = require("body-parser"),
	   mongoose = require("mongoose"),
	   passport	= require("passport"),
LocalStrategy	= require("passport-local"),
		flash	= require("connect-flash"),
methodOverride	= require("method-override"),
	   Comment 	= require("./models/comment"),
	 Campground = require("./models/campground"),
	 seedDB		= require("./seeds"),
	 User		= require("./models/user")

 var commentRoutes	 = require("./routes/comments"),
 	campgroundRoutes = require("./routes/campgrounds"),
 	indexRoutes		 = require("./routes/index")

// seedDB();



app.use(flash());    
app.use(methodOverride("_method"));

//passport congfiguration
app.use(require("express-session")({
	secret: "Rusty wins!",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//adding currentUser middleware to every page
app.use(function(req,res,next){
	res.locals.currentUser = req.user;

	//send flash message to every page
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	//then move to next code segment of that route
	next();
});

	 
 mongoose.connect("mongodb://localhost/yelp_camp");


app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine","ejs");

app.use(express.static(__dirname + "/public"));



//express routers using
app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);




app.get("/about",function(req,res){
	res.render("about");
});







app.listen(3000,function(){
	console.log("SERVER ON");
}); 