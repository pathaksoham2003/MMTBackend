
/**
 * @swagger
 * components:
 *   schemas:
 *     TiffinType:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *           enum: [Special, General]
 *         description:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */

/**
 * @swagger
 * /api/tiffin-types:
 *   post:
 *     summary: Create a new tiffin type
 *     tags: [TiffinTypes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 enum: [Special, General]
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tiffin type created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TiffinType'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/tiffin-types:
 *   get:
 *     summary: Get all tiffin types
 *     tags: [TiffinTypes]
 *     responses:
 *       200:
 *         description: List of tiffin types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TiffinType'
 *       500:
 *         description: Internal server error
 */