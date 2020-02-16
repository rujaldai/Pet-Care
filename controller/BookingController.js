'use strict';

var booking = require("../entity/Booking");
var BookingProductList = require("../entity/BookingProductList");
var BookingEnum = require("../enums/BookingEnum");

function bookInBulk(req, res, next) {
    console.log("inside book in bulk");
	var request = req.body;
	// request = request.map(before => {
	// 	var before = {
	// 	return {before.name, }
    // })
    console.log(request.productCart);
	booking.bookingSchema.create({
        name: request.name,
        contact: request.contact,
        address: request.address

	}).then(function(bookingResponse) {
        console.log("inside booking create");
        var bookingProducts = request.productCart.map(item => {
            return {product_id:item.product_id, quantity: item.quantity, status: item.status, booking_id: bookingResponse.id, user_id: item.product.user_id}
        })

        BookingProductList.bookingProductList.bulkCreate(
            bookingProducts,
            {returning: true})
            .then(function(response){
                console.log("Inside bookingProductList");
                if (response) {
                    bookingResponse.productCart = response;
                    res.status(200);
                    res.json({status: 200, message: "Booking successful!!", bookingResponse: bookingResponse});
                }
            }).catch(function(err) {
                console.log(err);
            })
    }).catch(function(error){
        console.log(error)
    });
}

function fetchAllBooking(req, res, next) {
	console.log(req.params);
	BookingProductList.bookingProductList.findAll({
		where: {
            user_id: req.params.userId,
            status: BookingEnum.PENDING
		}
	}).then(function (result) {
        var bookingProducts = result;
        var bookingList = [...new Set(result.map(i => i.booking_id))];
        
        booking.bookingSchema.findAll({
            where: {
                id: bookingList
            }
        }).then(function(booking) {
            if(booking) {
                booking.map(function(item, index) {
                    var productCarts = bookingProducts.filter(i => i.booking_id == item.id);
                    booking[index].setDataValue("productCart", productCarts);
                })
                res.json({
                    bookingClients: booking,
                    status: 200,
                    message: "Successfully fetched products"
                
                })
            }
            
        })
		
	}, function (err) {
		console.log(err);
		res.status(500);
		res.json({ status: 500, message: "Unable to fetch products." });
	});
}

function processBooking(req, res)  {
    console.log(req.params);
	BookingProductList.bookingProductList.update(
        {
            status: BookingEnum.PROCESSING
        }, 
        { 
            where: { 
                user_id: req.params.userId
            }    
        }
		
	).then(function (result) {
		console.log(result)
		res.status(200);
		res.json({
            status: 200,
            message: "Successfully processed " + result[0] + " products"
		})
	}, function (err) {
		console.log(err);
		res.status(500);
		res.json({ status: 500, message: "Unable to process products" });
	});
}
module.exports = {bookInBulk, fetchAllBooking, processBooking};