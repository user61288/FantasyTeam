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
		teamMembers: DataType.STRING,
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