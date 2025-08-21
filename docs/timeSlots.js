/**
 * @swagger
 * components:
 *   schemas:
 *     TimeSlot:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         start_time:
 *           type: string
 *           example: "14:00"
 *         end_time:
 *           type: string
 *           example: "16:00"
 *         type:
 *           type: string
 *           enum: [EVENING, AFTERNOON]
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */
/**
 * @swagger
 * /api/time-slots:
 *   post:
 *     summary: Create a new time slot
 *     tags: [TimeSlots]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - start_time
 *               - end_time
 *               - type
 *             properties:
 *               start_time:
 *                 type: string
 *                 example: "14:00"
 *               end_time:
 *                 type: string
 *                 example: "16:00"
 *               type:
 *                 type: string
 *                 enum: [EVENING, AFTERNOON]
 *     responses:
 *       201:
 *         description: Time slot created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TimeSlot'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/time-slots:
 *   get:
 *     summary: Get all time slots
 *     tags: [TimeSlots]
 *     responses:
 *       200:
 *         description: List of time slots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TimeSlot'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/time-slots/{id}:
 *   get:
 *     summary: Get a time slot by ID
 *     tags: [TimeSlots]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Time slot ID
 *     responses:
 *       200:
 *         description: Time slot details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TimeSlot'
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Time slot not found
 *       500:
 *         description: Internal server error
 */

