'use strict';

var bcrypt = require('bcrypt');
var userSchema = require('../entity/UserSchema.js');
var UserType = require("../enums/UserTypeEnum");


function validator(req, res, next) {
    console.log("inside validator");
	if (req.body.username === '' && req.body.password === '') {
		res.status(500);
		res.json({status:404, message: 'username and password is required'});
	} else if (req.body.username === '') {
		console.log("username not found ");
		res.status(500);
		res.json({status:404, message: 'username is required'});
	} else if (req.body.password === '') {
		console.log("password not found ");
		res.status(500);
        res.json({status:404, message: 'password is required'});
	} else if (!UserType.exists(req.body.userType)) {
        res.status(500);
        res.json({status: 500, message: "User type invalid"});
        return;
    }

	fetchUserByUsername(req.body.username)
	.then(function(result){
		if (result) {
			console.log("Username already exists.");
			res.status(500);
			res.json({"errorMessage": "Username already exists"});
		} else {
			next();	
		}
	})
}

function passwordCheck() {

}

function generateHash(req, res, next) {
	console.log("Inside generate hash");
	var saltRounds = 10;
	console.log(req.body.password);
	console.log(req.body.username);
	bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
		if (hash) {
			console.log(hash);
			updateIntoUser(req.body.username, hash, req.body.userType);
			res.json(hash);
		} else if (err) {

			console.log(err);
			res.json({error: "cannot generateHash"});
		}
	});
}

function updateIntoUser(username, hashedPassword, userType) {
	userSchema.userSchema.create({
        username: username,
        password: hashedPassword,
        user_type: userType}).then(function(success) {
		if (success) {
			console.log(success);
		} else {
			console.log("Inserted");
		}
	}).catch(function(err) {
		console.log(err);
	})
}

function deleteUser (req, res, next) {
	if (req.params.id === null || req.params.id === undefined) {
		res.status(404);
		res.json({message: "please specify id"});
	}
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
		res.json({message: "success"});
	})
	.catch(function(err) {
		console.log(err);
	})
}


function fetchUserByUsername(username) {
	return userSchema.userSchema.findOne({
		where: {
			username: username
		} 
	});
}

module.exports = {validator, passwordCheck, generateHash, deleteUser, fetchUserByUsername};