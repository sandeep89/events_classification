module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Event', {
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true
		},
		name: DataTypes.STRING,
		product: DataTypes.STRING
	});
};
