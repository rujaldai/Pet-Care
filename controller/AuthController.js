module.exports = (function() {
    var userController = require("./UserController.js");
var bcrypt = require("bcrypt");
var users = require("../entity/UserSchema.js");
var jwt = require("jsonwebtoken");


var secretOrPrivateKey = "SecretKeyCanBeAnythingWhichIsUsedWhileEncodingORdEcoding.";


function validator(req, res, next) {
	console.log("inside validator");
	if (req.body.username === '' || req.body.password === '') {
		res.json({message: "username or password not found."});
	}

	console.log(req.body);
	console.log(users);
	userController.fetchUserByUsername(req.body.username)
	.then(function(result) {
		console.log("successfully found");
		if(!result) {
			res.status(404);
			res.json("User not found");
		}
		console.log(result + " here");
		console.log(result.dataValues);
		req.hashedPassword = result.dataValues.password;
		next();
		
	})
	.catch(function(err) {
		console.log("user not found.");
	})
}

function passwordChecker(req, res, next) {
	console.log(req.body.password);
	console.log(req.dataValues);
	bcrypt.compare(req.hashedPassword, req.hashedPassword)
		.then(function(result) {
			console.log(result);
			next();
		})
		.catch(function(error) {
			console.log(error);
		})
	
}

function jwtTokenGen(req, res, next) {
	/*
	 * Bearer token because user bears token
	 * sign token using payload below so that it can be decoded to get payload
	 * payload is user details (usually)
	 */
	console.log("inside jwt token generator");
	var payload = {
		username: req.body.username, 
		userLevel: "superadmin"
	}
	jwt.sign(payload, secretOrPrivateKey, {expiresIn: "10h"}, function(err, result) {
		console.log(result);
		console.log(err);
		console.log(req.body.username);
		var token = result;
		userController.fetchUserByUsername(req.body.username).then(function(result){
			if (result) {
				console.log("logged in user data");
				console.log(result.username);
				console.log(result.fullname);
				res.json(
						{
							"userToken": token,
							"fullname": result.fullname,
							"username": result.username,
							"status":200,
							"message":"Login Success"
						}
					)		
			} else {
				next();	
			}
		});
	});

}

function verifyToken(req, res, next) {
	/*
	 * req.headers.authorization 	
	 * To send from client: Bearer[space]token 
	 */
	 if(req.headers.authorization) {
	 	var token = req.headers.authorization.slice(7, req.headers.authorization.size);
	 	jwt.verify(token, secretOrPrivateKey, function(err, result) {
	 		if (result) {
	 			console.log("token verified");
	 			next();
	 		} else if(err){
	 			console.log("token not verified");
	 			res.status(403);
	 			res.json({status: "403", message: "Forbidden"})
	 		}
	 	});	
	 } else {
	 	res.status(403);
	 	res.json({status: 403, message: "Forbidden"});
	 }
}

return {passwordChecker, validator, jwtTokenGen, verifyToken};
})();