'use strict';

var bcrypt = require('bcrypt');
var productSchema = require('../entity/ProductSchema.js');
var ProductType = require("../enums/ProductTypeEnum");


function validator(req, res, next) {
    console.log(req.body);
	if (req.body.name == undefined || req.body.name === '') {
		console.log("Product name not found ");
		res.status(500);
		res.json({status:500, message: 'Product name is required'});
	} else if (req.body.price == undefined || req.body.price === '') {
		console.log("Price not found ");
		res.status(500);
		res.json({status:500, message: 'Price is required'});
	} else if (req.body.desc == undefined || req.body.desc === '') {
		console.log("Description not found ");
		res.status(500);
		res.json({status:500, message: 'Description is required'});
	} else if (req.body.type == undefined || req.body.type === '') {
		console.log("Product type not found ");
		res.status(500);
		res.json({status:500, message: 'Product Type is required'});
	} else if (req.body.userId == undefined || req.body.userId === '') {
		console.log("User id is required ");
		res.status(500);
		res.json({status:500, message: 'User id is required'});
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
		image: product.image,
		user_id: product.userId
        
	}).then(function(success) {
		if (success) {
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

function fetchAllByUserId(req, res, next){
	console.log(req.params)
	if(req.params.userId == undefined || req.params.userId === '') {
		res.status(500);
		res.json({status: 200, message: "User id is required"});
	} else {
		productSchema.productSchema.findAll({
			where: {
				user_id: req.params.userId
			} 
		}).then(function(result) {
			console.log(result)
			res.status(200);
			res.json({
				products: result,
				status: 200,
			})
		}, function(err) {
			console.log(err);
			res.status(500);
			res.json({status: 500, message: "Unable to fetch products."});
		});
	}
}


function fetchProductByProductName(productName) {
	return productSchema.productSchema.findOne({
		where: {
			productName: productName
		} 
	});
}
function fetchAllProducts(req, res, next) {
	console.log(req.params);
	productSchema.productSchema.findAll().then(function(result) {
		console.log(result)
		res.status(200);
		res.json({
			products: result,
			status: 200,
		})
	}, function(err) {
		console.log(err);
		res.status(500);
		res.json({status: 500, message: "Unable to fetch products."});
	});
	
}

module.exports = {validator, fetchProductByProductName, deleteProduct, updateIntoProduct, fetchAllByUserId, fetchAllProducts};