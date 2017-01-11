// return User model as a function to sequelize.import()

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Event', {
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true
		},
		name: DataTypes.STRING
	});
};
