module.exports = (function() {
    var userController = require("./UserController.js");
var bcrypt = require("bcrypt");
var users = require("../entity/UserSchema.js");
var jwt = require("jsonwebtoken");


var secretOrPrivateKey = "SecretKeyCanBeAnythingWhichIsUsedWhileEncodingORdEcoding.";


function validator(req, res, next) {
	console.log("inside validator");
	if (req.body.email === '' || req.body.password === '') {
		res.status(400);
		res.json({message: "email or password not found.", status: 400});
	}

	console.log(req.body);
	console.log(users);
	userController.fetchUserByUsername(req.body.email)
	.then(function(result) {
		console.log("successfully found");
		console.log(req.body);
		if(!result) {
			res.status(404);
			res.json({message: "User not found", status: 404});
		}
		console.log(result + " here");
		console.log(result.dataValues);
		req.hashedPassword = result.dataValues.password;
		next();
		
	})
	.catch(function(err) {
		console.log(err);
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
		email: req.body.email, 
		userLevel: "superadmin"
	}
	jwt.sign(payload, secretOrPrivateKey, {expiresIn: "10h"}, function(err, result) {
		console.log(result);
		console.log(err);
		console.log(req.body.email);
		var token = result;
		userController.fetchUserByUsername(req.body.email).then(function(result){
			if (result) {
				console.log("logged in user data");
				console.log(result.email);
				console.log(result.fullname);
				res.json(
						{
							"userToken": token,
							"user": result,
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