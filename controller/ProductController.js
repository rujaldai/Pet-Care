'use strict';

var bcrypt = require('bcrypt');
var productSchema = require('../entity/ProductSchema.js');
var ProductType = require("../enums/ProductTypeEnum");


function validator(req, res, next) {
    console.log(req.body);
	if (req.body.name === '') {
		console.log("Product name not found ");
		res.status(500);
		res.json({status:500, message: 'Product name is required'});
	} else if (req.body.price === '') {
		console.log("Price not found ");
		res.status(500);
		res.json({status:500, message: 'Price is required'});
	} else if (req.body.desc === '') {
		console.log("Description not found ");
		res.status(500);
		res.json({status:500, message: 'Description is required'});
	} else if (req.body.productType === '') {
		console.log("Product type not found ");
		res.status(500);
		res.json({status:500, message: 'Product Type is required'});
	} else {
		next();	
	} 
}

function updateIntoProduct(req, res) {
    var product = req.body;
	productSchema.productSchema.create({
        name: product.name,
        price: product.price,
        type: product.type,
        desc: product.desc,
        image: product.image
        
	}).then(function(success) {
		if (success) {
            console.log(success)
            console.log("Product successfully inserted");
            res.json({status: 200, message: "Product inserted successfully", product: success});
		} else {
			console.log("Product could not be Inserted");
			res.status(500);
			res.json({message: "Could not insert Product!!!", status: 500})
		}
	}).catch(function(err) {
		console.log(err);
		console.log("err while inserting product");
		res.status(500);
		res.json({message: "Could not insert Product!!!", status: 500})
	})
}

function deleteProduct (req, res, next) {
	if (req.params.id === null || req.params.id === undefined) {
		res.status(500);
		res.json({message: "Please specify id", status: 500});
	} else {
		userSchema.userSchema.destroy({
			where: {
				id: req.params.id
			}
		})
		.then(function(result) {
			console.log(result);
			if (result === 0) {
				res.status(500)
				res.json({status: "500", message: "Could not delete."});
			}
			res.status(200);
			res.json({message: "success", status: 200});
		})
		.catch(function(err) {
			console.log(err);
			res.status(500)
			res.json({status: "500", message: "Could not delete."});
		})
	}
	
}


function fetchProductByProductName(productName) {
	return userSchema.userSchema.findOne({
		where: {
			productName: productName
		} 
	});
}

module.exports = {validator, fetchProductByProductName, deleteProduct, updateIntoProduct};