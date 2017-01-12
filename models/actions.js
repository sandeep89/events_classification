module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Action', {
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true
		},
		name: DataTypes.STRING
	});
};
