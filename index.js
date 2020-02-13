var express = require("express");
var bodyParser =  require("body-parser");
var databaseConfig = require("./databaseConfig/databaseConnection.js");
var swaggerConfig = require("./swagger_definitions/swaggerDefinitions.js");
var allRoutes = require("./end_points/AllRoutes.js");
var cors =  require('cors');
var path = require('path');
// console.log(databaseConfig);

var sequelize = databaseConfig.sequelize;
var Sequelize = databaseConfig.Sequelize;
var app = express();

const UserEnum = require("./enums/UserTypeEnum.js");

console.log(UserEnum.MEMBER_USER);

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use("/api-docs", swaggerConfig.swaggerUI.serve, swaggerConfig.swaggerUI.setup(swaggerConfig.swaggerSpecs));
app.use("/api", allRoutes);
app.use("/public", express.static(path.join(__dirname, 'public')));

app.listen(3023);
console.log("app running in 3023");
