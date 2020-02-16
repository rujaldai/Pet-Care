/**
* @swagger
* /api/product/add:
*   post:
*     security:
*       - bearerAuth: []
*     tags:
*       - Products
*     description: Product add testing
*     produces:
*       - application/json
*     consumes:
*       - application/x-www-form-urlencoded
*     parameters:
*       - name: name
*         in: formData
*         type: string
*         format: string
*         required: true
*         description: Please provide name
*       - name: price
*         in: formData
*         type: string
*         format: string
*         required: true
*         description: Please provide price
*       - name: type
*         in: formData
*         type: string
*         format: string
*         required: true
*         description: Please provide type
*       - name: desc
*         in: formData
*         type: string
*         format: string
*         required: true
*         description: Please provide description
*     responses:
*       201:
*         description: registered successfully
*       409:
*         description: registeration failed
*       200:
*         description: OK
*/

/**
* @swagger
* /api/product/{user_id}/all:
*   get:
*     tags:
*       - Products
*     description: This is for show merchant all products
*     produces:
*       - application/json
*     parameters:
*       - name: user_id
*         in: path
*         type: string
*         required: true
*         description: Please provide user id
*     responses:
*       409:
*         description: Failed
*       200:
*         description: OK
*/

/**
* @swagger
* /api/product/all:
*   get:
*     tags:
*       - Products
*     description: This is for show all products
*     produces:
*       - application/json
*     responses:
*       409:
*         description: Failed
*       200:
*         description: OK
*/


/**
* @swagger
* /api/product/{id}:
*   delete:
*     security:
*       - bearerAuth: []
*     tags:
*       - Products
*     description: This is for delete merchant product
*     produces:
*       - application/json
*     parameters:
*       - name: id
*         in: path
*         type: string
*         required: true
*         description: Please provide product
*     responses:
*       409:
*         description: Failed
*       200:
*         description: OK
*/

/**
* @swagger
* /api/product/update:
*   put:
*     security:
*       - bearerAuth: []
*     tags:
*       - Products
*     description: Product updating product
*     produces:
*       - application/json
*     consumes:
*       - application/x-www-form-urlencoded
*     parameters:
*       - name: id
*         in: formData
*         type: string
*         format: string
*         required: true
*         description: Please provide product id
*       - name: name
*         in: formData
*         type: string
*         format: string
*         required: true
*         description: Please provide name
*       - name: price
*         in: formData
*         type: string
*         format: string
*         required: true
*         description: Please provide price
*       - name: type
*         in: formData
*         type: string
*         format: string
*         required: true
*         description: Please provide type
*       - name: desc
*         in: formData
*         type: string
*         format: string
*         required: true
*         description: Please provide description
*     responses:
*       201:
*         description: product updated successfully
*       409:
*         description: product updated failed
*       200:
*         description: OK
*/


/**
* @swagger
* /api/product/book/product:
*   post:
*     tags:
*       - Booking
*     description: Booking product
*     produces:
*       - application/json
*     consumes:
*       - application/x-www-form-urlencoded
*     parameters:
*       - name: product_id
*         in: formData
*         type: string
*         format: string
*         required: true
*         description: Please provide product id
*       - name: name
*         in: formData
*         type: string
*         format: string
*         required: true
*         description: Please provide customer name
*       - name: contact
*         in: formData
*         type: string
*         format: string
*         required: true
*         description: Please provide contact details
*       - name: address
*         in: formData
*         type: string
*         format: string
*         required: true
*         description: Please provide address
*       - name: user_id
*         in: formData
*         type: string
*         format: string
*         required: true
*         description: Please provide merchant id
*     responses:
*       201:
*         description: product booked successfully
*       409:
*         description: product booking failed
*       200:
*         description: OK
*/


/**
* @swagger
* /api/product/booking/update:
*   post:
*     tags:
*       - Booking
*     description: update booked product
*     produces:
*       - application/json
*     consumes:
*       - application/x-www-form-urlencoded
*     parameters:
*       - name: id
*         in: formData
*         type: string
*         format: string
*         required: true
*         description: Please provide booking id
*       - name: status
*         in: formData
*         type: string
*         format: string
*         required: true
*         description: Please provide booking status
*     responses:
*       201:
*         description: product booking updated successfully
*       409:
*         description: product booking upate failed
*       200:
*         description: OK
*/



/**
* @swagger
* /api/product/booking/{userId}/all:
*   get:
*     tags:
*       - Booking
*     description: This is for getting all booking for merchants
*     produces:
*       - application/json
*     parameters:
*       - name: userId
*         in: path
*         type: string
*         required: true
*         description: Please provide merchant id
*     responses:
*       409:
*         description: Failed
*       200:
*         description: OK
*/
