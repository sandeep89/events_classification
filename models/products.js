module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Product', {
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true
		},
		name: DataTypes.STRING
	});
};
