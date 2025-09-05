/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: APIs for managing orders and delivery workflow
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       properties:
 *         line1: { type: string }
 *         line2: { type: string }
 *         city: { type: string }
 *         state: { type: string }
 *         pincode: { type: string }
 *         label: { type: string }
 *     Payment:
 *       type: object
 *       properties:
 *         payment_id: { type: string }
 *         payment_status: { type: string }
 *         amount: { type: number }
 *     DeliveryDetails:
 *       type: object
 *       properties:
 *         photo_url:
 *           type: string
 *           description: URL of parcel photo
 *         note:
 *           type: string
 *           description: Delivery note/reason
 *     Order:
 *       type: object
 *       required:
 *         - customer_id
 *         - user_subscription_id
 *         - mess_id
 *         - mess_tiffin_contents
 *         - amount
 *       properties:
 *         _id: { type: string }
 *         customer_id: { type: string, description: "Reference to User" }
 *         user_subscription_id: { type: string, description: "Reference to UserSubscription" }
 *         mess_id: { type: string, description: "Reference to MessDetails" }
 *         mess_tiffin_contents: { type: string, description: "Reference to MessTiffinTypeContents" }
 *         status:
 *           type: string
 *           enum: [IN_PROCESS, OUT_FOR_DELIVERY, DELIVERED, UN_DELIVERED, RETURNED]
 *         address: { $ref: '#/components/schemas/Address' }
 *         delivery_boy_id: { type: string, description: "Reference to User" }
 *         payment: { $ref: '#/components/schemas/Payment' }
 *         delivered_at: { type: string, format: date-time }
 *         delivery_details: { $ref: '#/components/schemas/DeliveryDetails' }
 *         amount: { type: number }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Order' }
 *     responses:
 *       201: { description: Order created }
 *       400: { description: Invalid input }
 *   get:
 *     summary: Get all orders (paginated)
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: Paginated orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalPages: { type: integer }
 *                 currentPage: { type: integer }
 *                 orders:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Order' }
 *
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Order found, content: { application/json: { schema: { $ref: '#/components/schemas/Order' } } } }
 *       404: { description: Order not found }
 *   put:
 *     summary: Update an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Order' }
 *     responses:
 *       200: { description: Order updated, content: { application/json: { schema: { $ref: '#/components/schemas/Order' } } } }
 *       404: { description: Order not found }
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Order deleted }
 *       404: { description: Order not found }
 *
 * /api/orders/user/{userId}/today:
 *   get:
 *     summary: Get today's orders for a user
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Orders for today
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Order' }
 *
 * /api/orders/future/{userId}:
 *   get:
 *     summary: Get computed future orders of a user
 *     description: |
 *       Returns upcoming orders that are **computed dynamically** from the user's active subscriptions.  
 *       These orders are **not yet stored in the DB**, but are generated based on the user's subscription plan, 
 *       slots (AFTERNOON/EVENING), remaining tiffins, and cutoff times.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: Computed future orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: "2025-09-06"
 *                   slot:
 *                     type: string
 *                     enum: [AFTERNOON, EVENING]
 *                     example: "AFTERNOON"
 *                   mess_id:
 *                     type: string
 *                     description: Mess reference
 *                   amount:
 *                     type: number
 *                     example: 120
 *                   subscription_id:
 *                     type: string
 *                     description: User subscription reference
 *       500:
 *         description: Server error

 * /api/orders/delivery/current:
 *   get:
 *     summary: Get current delivery orders for a delivery boy in a mess
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: messId
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: deliveryBoyId
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: Paginated delivery orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalPages: { type: integer }
 *                 currentPage: { type: integer }
 *                 orders:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Order' }
 *
 * /api/orders/user/{userId}/month:
 *   get:
 *     summary: Get monthly orders of a user (paginated)
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: month
 *         required: true
 *         schema: { type: integer, example: 9 }
 *       - in: query
 *         name: year
 *         required: true
 *         schema: { type: integer, example: 2025 }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: Paginated orders for the month
 *
 * /api/orders/place:
 *   post:
 *     summary: Place a DAILY/TRIAL order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Order' }
 *     responses:
 *       201: { description: Order placed }
 *       400: { description: Validation error }
 *       409: { description: Duplicate order for today }
 *
 * /api/orders/{id}/out-for-delivery:
 *   put:
 *     summary: Mark order as OUT_FOR_DELIVERY
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Order updated to OUT_FOR_DELIVERY }
 *       404: { description: Order not found }
 *
 * /api/orders/{id}/delivered:
 *   put:
 *     summary: Mark order as DELIVERED
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               delivery_details: { $ref: '#/components/schemas/DeliveryDetails' }
 *               delivered_at: { type: string, format: date-time }
 *     responses:
 *       200: { description: Order marked DELIVERED }
 *       404: { description: Order not found }
 *
 * /api/orders/{id}/un-delivered:
 *   put:
 *     summary: Mark order as UN_DELIVERED
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               delivery_details: { $ref: '#/components/schemas/DeliveryDetails' }
 *     responses:
 *       200: { description: Order marked UN_DELIVERED }
 *       404: { description: Order not found }
 *
 * /api/orders/user/{userId}/history:
 *   get:
 *     summary: Get order history of a user (paginated)
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: Paginated order history
 */
