module.exports = function(sequelize, DataType){
	var Users = sequelize.define("Users", {
		name: {
			type: DataType.STRING,
			allowNull: false
		},
		email: {
			type: DataType.STRING,
			allowNull: false
		},
		password: {
			type: DataType.STRING,
			allowNull: false
		},
		image: {
			type: DataType.STRING,
			defaultValue: "./images/defaultAvatar.png",
		},
		teamName: {
			type: DataType.STRING,
			allowNull: false
		}, 
		teamMembers: {
			type: DataType.STRING,
			defaultValue: function() {
				var string = "";
				for(var i=0; i<7; i++) {
					var num = Math.floor((Math.random() * 35) +1);
					string += num + ",";
				};
				return string;
			}
		},
		score: {
			type: DataType.INTEGER,
			defaultValue: 0
		},
		highestScore: {
			type: DataType.INTEGER,
			defaultValue: 0
		} 
	
		
	});
	return Users; 
};