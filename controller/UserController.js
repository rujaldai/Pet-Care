'use strict';

var bcrypt = require('bcrypt');
var userSchema = require('../entity/UserSchema.js');
var UserType = require("../enums/UserTypeEnum");


function validator(req, res, next) {
    console.log(req.body);
	if (req.body.email === '' && req.body.password === '') {
		res.status(500);
		res.json({status:404, message: 'email and password is required'});
	} else if (req.body.fullName === '') {
		console.log("fullname not found ");
		res.status(500);
		res.json({status:500, message: 'Fullname is required'});
	} else if (req.body.address1 === '') {
		console.log("address not found ");
		res.status(500);
		res.json({status:500, message: 'address is required'});
	} else if (req.body.mobile === '') {
		console.log("mobile not found ");
		res.status(500);
		res.json({status:500, message: 'mobile is required'});
	} else if (req.body.phone === '') {
		console.log("phone not found ");
		res.status(500);
		res.json({status:500, message: 'phone is required'});
	} else if (req.body.password === '') {
		console.log("password not found ");
		res.status(500);
        res.json({status:500, message: 'password is required'});
	} else {
	fetchUserByUsername(req.body.email)
	.then(function(result){
		if (result) {
			console.log("Username already exists.");
			res.status(500);
			res.json({status: "500", message: "Username already exists"});
		} else {
			next();	
		}
	})
	} 
}

function passwordCheck() {

}

function getHashFromString(password) {
	var saltRounds = 10;
	return bcrypt.hash(password, saltRounds, function(err, hash) {
		if (hash) {
			return hash;
		} else if (err) {
			res.json({status: 500, message: "cannot generateHash"});
		}
	});
}

function generateHash(req, res, next) {
	console.log("Inside generate hash");
	var saltRounds = 10;
	console.log(req.body.password);
	bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
		if (hash) {
			console.log(hash);
			updateIntoUser(req.body, hash);
			res.json({token: hash});
		} else if (err) {

			console.log(err);
			res.json({message: "cannot generateHash"});
		}
	});
}

function updateIntoUser(user, hashedPassword) {
	userSchema.userSchema.create({
		fullname: user.fullName,
		username: user.email,
		password: hashedPassword,
		user_type: UserType.MERCHANT_USER,
		phone: user.phone,
		mobile: user.mobile,
		address1: user.address1,
		address2: user.address2
	}).then(function(success) {
		if (success) {
			console.log("user successfully inserted");
		} else {
			console.log("User could not be Inserted");
		}
	}).catch(function(err) {
		console.log(err);
		console.log("err while inserting user");
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

module.exports = {validator, passwordCheck, generateHash, deleteUser, fetchUserByUsername, getHashFromString};