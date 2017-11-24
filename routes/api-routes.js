// Requiring the models
var db = require("../models");


// Routes
// =============================================================
module.exports = function(app) {

	// GET route for getting all of the todos
	app.get("/api/players", function(req, res) {
		// findAll returns all entries for a table when used with no options
		db.Players.findAll({}).then(function(dbPlayers) {
			// We have access to the todos as an argument inside of the callback function

			res.json(dbPlayers);


		});
	});

	// POST route for saving a new user
	app.post("/api/users", function(req, res) {
		randomTeam(function(teamMembers) {
			writeUser(req.body.username, req.body.email, req.body.password, teamMembers);

		});
		
		res.redirect("/users/login");

	});


	// PUT route for updating users teams.
	app.put("/api/users", function(req, res) {

	});
	
	

	app.get("/api/team/:name", function(req,res){
		console.log("====name====" + req.params.name);
		db.Users.findOne({
			where: {
				name: req.params.name
			}
		}).then(function(data){
			console.log(data);
			res.json(data);
		});
	})









	function randomTeam(cb){
		db.Players.findAll({
			where: {
				value: 0
			}
		}).then(function(dbPlayers) {
			var numbersGenerated = [];
			var teamMembers = [];
			while (teamMembers.length < 7){

				var randomID = Math.floor(Math.random() * dbPlayers.length);

				if (numbersGenerated.indexOf(randomID) == -1){

					teamMembers.push(dbPlayers[randomID].id);
					numbersGenerated.push(randomID);
				}

			}
			console.log(teamMembers.toString());
			cb(teamMembers);
			//return teamMembers.toString();
		});
	};




	function writeUser(username, email, password, teamMembers) {
		db.Users.create({
			name: username,
			email: email,
			password: password,
			teamName: username + " Team",
			teamMembers : teamMembers.toString()
		})
			.then(function(dbUser) {
			return dbUser;

		});
	};
};


