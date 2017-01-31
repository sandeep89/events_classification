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
		object_context: DataTypes.STRING,
		actor_context: DataTypes.STRING,
		action_context: DataTypes.STRING,
		device_context: DataTypes.STRING,
		web_context: DataTypes.STRING,
		app_context: DataTypes.STRING,
		geolocation_context: DataTypes.STRING,
		page_context: DataTypes.STRING,
		screen_context: DataTypes.STRING,
		attribution_context: DataTypes.STRING,
		product_context: DataTypes.STRING
	});
	return EventList;
};
