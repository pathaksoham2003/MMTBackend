/**
 * @swagger
 * components:
 *   schemas:
 *     Subscription:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         subscription_duration:
 *           type: string
 *           enum: [WEEKLY, MONTHLY, DAILY]
 *           example: "MONTHLY"
 *         mess_id:
 *           $ref: '#/components/schemas/MessDetails'
 *         day_slot:
 *           type: string
 *           enum: [AFTERNOON, EVENING, AFTERNOON+EVENING]
 *           example: "EVENING"
 *         price:
 *           type: number
 *           format: float
 *           example: 1499.99
 *         type:
 *           type: string
 *           example: "NORMAL"
 *         buffer_days:
 *           type: integer
 *           example: 2
 *         max_user_skips:
 *           type: integer
 *           example: 3
 *         max_mess_skips:
 *           type: integer
 *           example: 5
 *         provided_tiffins:
 *           type: integer
 *           example: 30
 *         time_slots:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               start_time:
 *                 type: string
 *                 example: "12:00"
 *               end_time:
 *                 type: string
 *                 example: "14:00"
 *         veg_only:
 *           type: boolean
 *           example: true
 *         active:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     MessDetails:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "64f4c3b89c6d7f001f4c2d12"
 *         name:
 *           type: string
 *           example: "ABC Mess"
 *         address:
 *           type: string
 *           example: "123 Street, Mumbai"
 *         owner:
 *           type: string
 *           example: "John Doe"
 *         phone:
 *           type: string
 *           example: "+91-9876543210"
 */

/**
 * @swagger
 * /api/subscriptions:
 *   post:
 *     summary: Create a new subscription
 *     tags: [Subscriptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subscription_duration
 *               - mess_id
 *               - day_slot
 *               - price
 *               - type
 *               - buffer_days
 *               - max_user_skips
 *               - max_mess_skips
 *               - provided_tiffins
 *               - time_slots
 *               - veg_only
 *             properties:
 *               subscription_duration:
 *                 type: string
 *                 enum: [WEEKLY, MONTHLY, DAILY]
 *                 example: "MONTHLY"
 *               mess_id:
 *                 type: string
 *                 example: "64f4c3b89c6d7f001f4c2d12"
 *               day_slot:
 *                 type: string
 *                 enum: [AFTERNOON, EVENING, AFTERNOON+EVENING]
 *                 example: "EVENING"
 *               price:
 *                 type: number
 *                 example: 1499.99
 *               type:
 *                 type: string
 *                 example: "NORMAL"
 *               buffer_days:
 *                 type: integer
 *                 example: 2
 *               max_user_skips:
 *                 type: integer
 *                 example: 3
 *               max_mess_skips:
 *                 type: integer
 *                 example: 5
 *               provided_tiffins:
 *                 type: integer
 *                 example: 30
 *               time_slots:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     start_time:
 *                       type: string
 *                       example: "12:00"
 *                     end_time:
 *                       type: string
 *                       example: "14:00"
 *               veg_only:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Subscription created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/subscriptions:
 *   get:
 *     summary: Get all subscriptions (pagination, filters, search)
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: mess_id
 *         schema:
 *           type: string
 *           example: "64f4c3b89c6d7f001f4c2d12"
 *       - in: query
 *         name: day_slot
 *         schema:
 *           type: string
 *           enum: [AFTERNOON, EVENING, AFTERNOON+EVENING]
 *           example: "EVENING"
 *       - in: query
 *         name: veg_only
 *         schema:
 *           type: boolean
 *           example: true
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           example: "NORMAL"
 *       - in: query
 *         name: subscription_duration
 *         schema:
 *           type: string
 *           enum: [WEEKLY, MONTHLY, DAILY]
 *           example: "WEEKLY"
 *     responses:
 *       200:
 *         description: List of subscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalItems:
 *                   type: integer
 *                 subscriptions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Subscription'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/subscriptions/{id}:
 *   get:
 *     summary: Get subscription by ID
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "64f4c3b89c6d7f001f4c2d12"
 *     responses:
 *       200:
 *         description: Subscription details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/subscriptions/{id}/toggle:
 *   patch:
 *     summary: Toggle subscription active/inactive
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "64f4c3b89c6d7f001f4c2d12"
 *     responses:
 *       200:
 *         description: Subscription toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Internal server error
 */
