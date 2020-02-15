module.exports = (function() {
    var routes = require("express").Router();
    var productController = require("../../controller/ProductController.js");
    var authController = require("../../controller/AuthController");

routes.post('/add', authController.verifyToken, productController.validator, productController.insertIntoProduct);
routes.get('/:userId/all', productController.fetchAllByUserId);
routes.get('/all', productController.fetchAllProducts);
routes.post('/:id', authController.verifyToken, productController.deleteProduct);
routes.put('/update', authController.verifyToken, productController.validator, productController.updateIntoProduct);

routes.post('/book/product', productController.initiateBooking);
routes.get('/booking/:userId/all', productController.fetchAllBooking);
routes.post('/booking/update', productController.updateBooking);
return routes;
})();
