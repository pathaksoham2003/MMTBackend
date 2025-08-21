/**
 * @swagger
 * components:
 *   schemas:
 *     Subscription:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         mess_id:
 *           $ref: '#/components/schemas/MessDetails'
 *         day_slot:
 *           $ref: '#/components/schemas/DaySlotTypes'
 *         price:
 *           type: number
 *         type:
 *           $ref: '#/components/schemas/SubscriptionTypes'
 *         time_slots:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TimeSlots'
 *         veg_only:
 *           type: boolean
 *         active:
 *           type: boolean
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
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
 *               - name
 *               - mess_id
 *               - day_slot
 *               - price
 *               - type
 *               - time_slots
 *               - veg_only
 *             properties:
 *               name:
 *                 type: string
 *               mess_id:
 *                 type: string
 *               day_slot:
 *                 type: string
 *               price:
 *                 type: number
 *               type:
 *                 type: string
 *               time_slots:
 *                 type: array
 *                 items:
 *                   type: string
 *               veg_only:
 *                 type: boolean
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
 *       - in: query
 *         name: mess_id
 *         schema:
 *           type: string
 *       - in: query
 *         name: day_slot
 *         schema:
 *           type: string
 *       - in: query
 *         name: veg_only
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *       - in: query
 *         name: time_slot_id
 *         schema:
 *           type: string
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
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
