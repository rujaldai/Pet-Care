module.exports = (function() {
    var routes = require("express").Router();
    var productController = require("../../controller/ProductController.js");
    var authController = require("../../controller/AuthController");

routes.post('/add', authController.verifyToken, productController.validator, productController.updateIntoProduct);

// routes.delete('/:id', authController.verifyToken, userController.deleteUser);

return routes;
})();