var dbConfig = require('../databaseConfig/databaseConnection.js');
var sequelize = dbConfig.sequelize;
var Sequelize = dbConfig.Sequelize;

var BookingEnum = require('../enums/BookingEnum');


var bookingProductList = sequelize.define('bookingProductList',
// attributes
{
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	product_id: {
		type: Sequelize.INTEGER,
        allowNull: false,
        references: {
			model: "products",
			key: "id"
		}
	},
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: true,
		defaultValue: 1
	},
	status: {
		type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: BookingEnum.PENDING
    },
    booking_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
			model: "booking",
			key: "id"
		}
	},
	user_id: {
		type: Sequelize.INTEGER,
		allowNull: true,
		references: {
			model: "users",
			key: "id"
		}
	}
}, {
	//Options
	paranoid: true,
	freezeTableName: true,
	tableName: 'booking_product_list'
});

bookingProductList.sync({ /* stop forcing updating table */ force: false})
.then(function(result){
	console.log("inside booking product list sync:: " + result);
})
.catch(function(err) {
	console.log(err);
});

module.exports = {bookingProductList};
