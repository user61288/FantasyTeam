var score, player,team;

$.get("/api/players", function(data){
	createNewPlayer(data);

});


function createNewPlayer(data){

	for (var i =0; i< data.length; i++){		
		player = $("<div class='player card text-center'>");
		player.attr("playerID", data[i].id);
		var playerPic = $("<img>");
		var playerName = $("<h6 class='card-header'>");
		var playerClub = $("<h6>");
		var playerPossition = $("<h6>");
		var playerValue = $("<h6 class='value'>");
		playerPic.attr("src", data[i].image);
		playerPic.attr("class", "card-img");
		playerName.text(data[i].name);
		playerClub.text(data[i].club);
		playerPossition.text(data[i].position);
		playerValue.text("Value: " + data[i].value);
		player.append(playerName);
		player.append(playerPic);
		player.append(playerClub);
		player.append(playerPossition);
		player.append(playerValue);
		player.append($("<button class='buy btn btn-success btn-sm'>" + "Buy" + "</button>"));
		player.append($("<span id='latestScore'>" + data[i].current_score + "</span>"));
		$(".players").append(player);
	}
};


$(".search").on("click", function(){
	var name = $(".name").val();

	$.get("/api/team/" + name )

		.then(function(data){
		team = data.teamMembers.split(",");
		score = data.score;
		var teamName = data.teamName;
		var avatar = data.image;

		$(".team h6").text(teamName);
		$(".navbar-brand img").attr("src", avatar);
		$("#score").text(score);

		for(var i = 0; i < team.length; i++){
			var teamPlayer = $("[playerID=" +team[i] +"]");
			teamPlayer.find("button").text("Delete").removeClass("buy").addClass("delete");
			teamPlayer.appendTo($(".team"));


		}

		console.log(team);
	});

});

$(document).on("click", ".buy", function(){
	var parent = $(this).parent();
	playersValue = parent.find(".value").text().replace(/\D/g,'');

	var count= $('.team div').length;

	if(score >= playersValue && count < 7){

		buy(parent);
	}else{
		alert("you can't afford this player or your squad is full.");
	}
	console.log(team);
});


$(document).on("click", ".delete", function(){
	var parent = $(this).parent();
	remove(parent);
	console.log(team);

});


function buy(div){
	div.find("button").text("Delete").removeClass("buy").addClass("delete");
	div.appendTo($(".team"));
	var playerID = div.attr("playerID");
	team.push(playerID);
};


function remove(div){
	div.find("button").text("Buy").removeClass("delete").addClass("buy");
	div.appendTo($(".players"));
	var playerID = div.attr("playerID");

	team = team.filter(function(item) { 
		return item !== playerID
	})
}