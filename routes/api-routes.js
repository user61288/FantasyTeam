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

	// app.post("/api/user", function(req, res) {
	// 	db.User.create({
			
	// 	})
	// });
};