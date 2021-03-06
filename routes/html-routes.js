// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

	// Each of the below routes just handles the HTML page that the user gets sent to.


	app.get("/", function(req, res) {
		res.render("index");
	});
	
	
	app.get("/dashboard", function(req, res) {
		res.render("dashboard");
	});

	app.get("/about", function(req, res) {
		res.render("about");
	});


	app.get("/users/login", function(req, res) {
		res.render("login");
	}); 

	app.get("/users/register", function(req, res) {
		res.render("register");
	});

	app.get("/users/game", function(req, res) {
		res.render("game");
	});

};
