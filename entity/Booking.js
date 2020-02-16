var dbConfig = require('../databaseConfig/databaseConnection.js');
var sequelize = dbConfig.sequelize;
var Sequelize = dbConfig.Sequelize;


var bookingSchema = sequelize.define('booking',
// attributes
{
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	name: {
		type: Sequelize.TEXT,
		allowNull: false	
    },
    contact: {
		type: Sequelize.TEXT,
		allowNull: false	
    },
    address: {
		type: Sequelize.TEXT,
		allowNull: false	
	},
	product_id: {
		type: Sequelize.INTEGER,
        allowNull: true,
        references: {
			model: "products",
			key: "id"
		}
	},
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: true
	},
	status: {
		type: Sequelize.TEXT,
		allowNull: true	
    },
}, {
	//Options
	paranoid: true,
	freezeTableName: false,
	tableName: 'booking'
});
bookingSchema.sync({ /* stop forcing updating table */ force: false})
.then(function(result){
	console.log("inside booking schema sync:: " + result);
})
.catch(function(err) {
	console.log(err);
});

module.exports = {bookingSchema};
