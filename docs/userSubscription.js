/**
 * @swagger
 * tags:
 *   name: UserSubscription
 *   description: Manage user subscriptions
 */

/**
 * @swagger
 * /api/usersubscription:
 *   post:
 *     summary: Create a new user subscription
 *     tags: [UserSubscription]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer_id
 *               - plan_id
 *             properties:
 *               customer_id:
 *                 type: string
 *                 description: ID of the customer
 *               plan_id:
 *                 type: string
 *                 description: ID of the subscription plan
 *               delivery_preferences:
 *                 type: object
 *                 description: User’s delivery preferences
 *                 example:
 *                   time: "08:00 AM"
 *                   address: "123 Street, City"
 *               payment:
 *                 type: object
 *                 description: Payment details
 *                 example:
 *                   mode: "UPI"
 *                   status: "PAID"
 *                   transaction_id: "txn_12345"
 *     responses:
 *       201:
 *         description: User subscription created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSubscription'
 *       404:
 *         description: Subscription plan not found
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/usersubscription/{customerId}:
 *   get:
 *     summary: Get all subscriptions of a user
 *     tags: [UserSubscription]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the customer
 *     responses:
 *       200:
 *         description: List of user subscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserSubscription'
 *       404:
 *         description: No subscriptions found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/usersubscription/progress/{subscriptionId}:
 *   get:
 *     summary: Get tiffin progress (received vs. provided) of a subscription
 *     tags: [UserSubscription]
 *     parameters:
 *       - in: path
 *         name: subscriptionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user subscription
 *     responses:
 *       200:
 *         description: Tiffin progress retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subscription_id:
 *                   type: string
 *                 customer_id:
 *                   type: string
 *                 plan_id:
 *                   type: string
 *                 total_provided:
 *                   type: integer
 *                 total_received:
 *                   type: integer
 *                 total_left:
 *                   type: integer
 *                 is_active:
 *                   type: boolean
 *       404:
 *         description: Subscription or plan not found
 *       500:
 *         description: Internal server error
 */
