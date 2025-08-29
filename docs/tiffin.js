/**
 * @swagger
 * tags:
 *   name: Tiffins
 *   description: API endpoints for managing Tiffins
 */

/**
 * @swagger
 * /api/tiffins:
 *   post:
 *     summary: Create a new Tiffin
 *     tags: [Tiffins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tiffin'
 *     responses:
 *       201:
 *         description: Tiffin created successfully
 *       400:
 *         description: Bad request
 *
 *   get:
 *     summary: Get all Tiffins
 *     tags: [Tiffins]
 *     responses:
 *       200:
 *         description: List of all Tiffins
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/tiffins/{id}:
 *   get:
 *     summary: Get a Tiffin by ID
 *     tags: [Tiffins]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Tiffin ID
 *     responses:
 *       200:
 *         description: Tiffin details
 *       404:
 *         description: Tiffin not found
 *
 *   put:
 *     summary: Update a Tiffin by ID
 *     tags: [Tiffins]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Tiffin ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tiffin'
 *     responses:
 *       200:
 *         description: Tiffin updated successfully
 *       404:
 *         description: Tiffin not found
 *
 *   delete:
 *     summary: Delete a Tiffin by ID
 *     tags: [Tiffins]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Tiffin ID
 *     responses:
 *       200:
 *         description: Tiffin deleted successfully
 *       404:
 *         description: Tiffin not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Tiffin:
 *       type: object
 *       required:
 *         - mess_id
 *         - is_veg
 *         - maximum_price
 *       properties:
 *         mess_id:
 *           type: string
 *           description: ID of the mess providing this Tiffin
 *         items:
 *           type: object
 *           properties:
 *             quantity:
 *               type: number
 *             unit:
 *               type: string
 *             nutrition:
 *               type: string
 *             protein:
 *               type: string
 *         type:
 *           type: string
 *           enum: [NORMAL, SPECIAL]
 *           default: NORMAL
 *         is_veg:
 *           type: boolean
 *         photos:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of S3 image URLs
 *         maximum_price:
 *           type: number
 *           description: Maximum price of the Tiffin
 *         active:
 *           type: boolean
 *           default: true
 */
