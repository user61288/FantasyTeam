var db = require("../models"); 

module.exports = function(app) {
	//GET all players
	app.get("/api/players", function(req, res) {
		db.Players.findAll({}).then( function(data) {
			res.json(data);
		}); 
	});

	//GET 	specifc player by id
	app.get("/api/players/:id", function(req, res) {
		db.Players.findAll({
			where: {id: req.params.id}
		}).then( function(data) {
			res.json(data);
		});
	});

	//PUT  updates player
	// Not working 
	app.put("/api/players/:id", function(req, res) {
		db.Users.update({
			current_score: req.body.score
		}, {
			where: {
				id: req.params.id
			}
		}).then(function(data) {
			res.json(data);
		});
	});

	//GET all users
	app.get("/api/users", function(req, res) {
		db.Users.findAll({}).then( function(data) {
			res.json(data);
		});
	});

	//GET 	specific user by id
	app.get("/api/users/:id", function(req, res) {
		db.Users.findAll({
			where: {id: req.params.id}
		}).then(function(data) {
			res.json(data);
		});
	});

	//POST 	add new user to database
	app.post("/api/users", function(req, res) {
		db.Users.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			teamName: req.body.teamName
		}).then( function(new_user) {
			res.json(new_user);
		});
	});

	//PUT  updates user 
	app.put("/api/users/:id", function(req, res) {
		db.Users.update({
			name: req.body.name,
			password: req.body.password,
			teamName: req.body.teamName, 
			teamMembers: req.body.teamMembers
		}, { where: {id: req.params.id } }).then( function(data) {
			res.json(data);
		});
	});

	app.delete("/api/users/:id", function(req, res) {
		db.Users.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(data) {
			res.json(data);
		});
	});

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
}

