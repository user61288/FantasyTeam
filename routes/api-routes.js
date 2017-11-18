var db = require("../models");

module.exports = function(app) {
	//GET all players
	app.get("/api/players", function(req, res) {
		db.Players.findAll({}).then(function(dbPlayer) {
			res.json(dbPlayer);
		});
	});

	//GET specifc player by id
	app.get("/api/players/:id", function(req, res) {
		db.Players.findAll({
			where: {id: req.params.id}
		}).then( function(dbPlayer) {
			res.json(dbPlayer);
		});
	});

	//GET all users
	app.get("/api/users", function(req, res) {
		db.Users.findAll({}).then( function(dbUsers) {
			res.json(dbUsers);
		});
	});

	//POST add new user to database
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
};