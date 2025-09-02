/**
 * @swagger
 * tags:
 *   name: Scheduler
 *   description: Scheduler & Queue management APIs
 */

/**
 * @swagger
 * /api/scheduler/stats:
 *   get:
 *     summary: Get scheduler queue stats
 *     tags: [Scheduler]
 *     responses:
 *       200:
 *         description: Queue statistics and repeatable jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 queueStats:
 *                   type: object
 *                   properties:
 *                     waiting:
 *                       type: integer
 *                       example: 2
 *                     active:
 *                       type: integer
 *                       example: 1
 *                     completed:
 *                       type: integer
 *                       example: 10
 *                     failed:
 *                       type: integer
 *                       example: 0
 *                     repeatableJobs:
 *                       type: integer
 *                       example: 3
 *                 repeatableJobs:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/scheduler/debug:
 *   get:
 *     summary: Run scheduler debug (logs info to console)
 *     tags: [Scheduler]
 *     responses:
 *       200:
 *         description: Debug info executed
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/scheduler/orders/{slot}:
 *   post:
 *     summary: Manually trigger order processing for a given slot
 *     tags: [Scheduler]
 *     parameters:
 *       - in: path
 *         name: slot
 *         schema:
 *           type: string
 *           enum: [AFTERNOON_ONLY, EVENING_ONLY]
 *         required: true
 *         description: The time slot for processing orders
 *     responses:
 *       200:
 *         description: Successfully processed test orders
 *       500:
 *         description: Internal server error
 */
