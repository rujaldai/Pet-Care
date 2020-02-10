module.exports = ( function() {
    'use strict';
    var routes = require("express").Router();
    var userEndPoints = require("./user/UserEndpoints");
    var productEndPoints = require("./product/ProductEndPoints");
    var uploadEndPoints = require("./upload/UploadEndpoint");

    routes.use("/user", userEndPoints);
    routes.use("/product", productEndPoints);
    routes.use("/upload", uploadEndPoints);

    return routes;
})();