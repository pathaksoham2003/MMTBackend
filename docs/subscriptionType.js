/**
 * @swagger
 * components:
 *   schemas:
 *     SubscriptionType:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         type:
 *           type: string
 *           enum: [Daily, Weekly, Monthly]
 *         buffer_days:
 *           type: number
 *           example: 2
 *         provided_tiffins:
 *           type: number
 *           example: 30
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */

/**
 * @swagger
 * /api/subscription-types:
 *   post:
 *     summary: Create a new subscription type
 *     tags: [SubscriptionTypes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - buffer_days
 *               - provided_tiffins
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [Daily, Weekly, Monthly]
 *               buffer_days:
 *                 type: number
 *                 example: 2
 *               provided_tiffins:
 *                 type: number
 *                 example: 30
 *     responses:
 *       201:
 *         description: Subscription type created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubscriptionType'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/subscription-types:
 *   get:
 *     summary: Get all subscription types
 *     tags: [SubscriptionTypes]
 *     responses:
 *       200:
 *         description: List of subscription types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SubscriptionType'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/subscription-types/{id}:
 *   get:
 *     summary: Get a subscription type by ID
 *     tags: [SubscriptionTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subscription type ID
 *     responses:
 *       200:
 *         description: Subscription type details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubscriptionType'
 *       404:
 *         description: Subscription type not found
 *       500:
 *         description: Internal server error
 */
