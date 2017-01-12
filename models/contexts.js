// Model which stores all the context information for object, action, and actor
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Context', {
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true
		},
		name: DataTypes.STRING
	});
};
