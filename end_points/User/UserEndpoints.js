module.exports = (function() {
    var routes = require("express").Router();
    var userController = require("../../controller/UserController.js");
    var authController = require("../../controller/AuthController");

routes.post('/registration', userController.validator, userController.generateHash);
routes.delete('/:id', authController.verifyToken, userController.deleteUser);
routes.post('/login', authController.validator, authController.passwordChecker, authController.jwtTokenGen);
routes.get('/all', userController.fetchAllUser);


return routes;
})();