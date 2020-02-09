var dbConfig = require('../databaseConfig/databaseConnection.js');
var sequelize = dbConfig.sequelize;
var Sequelize = dbConfig.Sequelize;


var userSchema = sequelize.define('user',
// attributes
{
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	email: {
		type: Sequelize.TEXT,
		allowNull: false	
	},
	password: {
		type: Sequelize.TEXT,
		allowNull: false	
	},
	fullname: {
		type: Sequelize.TEXT,
		allowNull: false	
	},
	user_type: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	address1:{
		type: Sequelize.TEXT,
		allowNull: false
	},
	address2:{
		type: Sequelize.TEXT,
		allowNull: true
	},
	phone:{
		type: Sequelize.TEXT,
		allowNull: true
	},
	mobile:{
		type: Sequelize.TEXT,
		allowNull: false
	}
}, {
	//Options
	paranoid: true,
	freezeTableName: false,
	tableName: 'users'
});

userSchema.sync({ /* stop forcing updating table */ force: false})
.then(function(result){
	console.log("inside userschema sync:: " + result);
})
.catch(function(err) {
	console.log(err);
});

module.exports = {userSchema};
