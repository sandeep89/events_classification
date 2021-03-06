// return User model as a function to sequelize.import()

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Object', {
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true
		},
		name: DataTypes.STRING
	});
};
