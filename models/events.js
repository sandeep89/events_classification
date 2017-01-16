module.exports = function(sequelize, DataTypes) {
	var Event = sequelize.define('Event', {
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true
		},
		name: DataTypes.STRING,
		product_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: true
		}
	}, {
		classMethods: {
			associate: function(models) {
				Event.belongsTo(models.Product, {
					foreignKey: 'product_id'
				});
			}
		}
	});

	return Event;
};
