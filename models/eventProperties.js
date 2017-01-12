module.exports = function(sequelize, DataTypes) {
	return sequelize.define('EventProperties', {
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true
		},
		event_id: {
			type: DataTypes.INTEGER.UNSIGNED
		},
		attribute_type: DataTypes.STRING,
		name: DataTypes.STRING
	});
};
