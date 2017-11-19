var player;

function createNewPlayer(data){

	for (var i =0; i< data.length; i++){		
		player = $("<div class='player'>");
		var playerPic = $("<img>");
		var playerName = $("<h4>");
		var playerClub = $("<h6>");
		var playerPossition = $("<h6>");
		var playerValue = $("<h6>");
		playerPic.attr("src", data[i].image);
		playerName.text(data[i].name);
		playerClub.text("Club: " + data[i].club);
		playerPossition.text("Position: " + data[i].position);
		playerValue.text("Value: " + data[i].value);
		player.append(playerPic);
		player.append(playerName);
		player.append(playerClub);
		player.append(playerPossition);
		player.append(playerValue);

		$(".players").append(player);

	}
};



$.get("/api/players", function(data){
	console.log("player", data);

	createNewPlayer(data);
	console.log(player);
	
});


