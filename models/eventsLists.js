module.exports = function(sequelize, DataTypes) {
	var EventList = sequelize.define('EventList', {
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true
		},
		actor_name: DataTypes.STRING,
		action_name: DataTypes.STRING,
		object_name: DataTypes.STRING,
		platform_name: DataTypes.STRING,
		context: DataTypes.STRING
	});
	return EventList;
};
