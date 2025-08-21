/**
 * @swagger
 * /api/mess:
 *   post:
 *     summary: Create a new Mess
 *     tags: [Mess]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               mess_owner:
 *                 type: string
 *                 description: User ID of the Mess Owner
 *                 example: "60d5ecb8b392a123456789ab"
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of mess photos to upload
 *               address:
 *                 type: object
 *                 properties:
 *                   phone:
 *                     type: string
 *                     example: "9876543210"
 *                   line1:
 *                     type: string
 *                     example: "123 Main St"
 *                   line2:
 *                     type: string
 *                     example: "Near Park"
 *                   city:
 *                     type: string
 *                     example: "Springfield"
 *                   state:
 *                     type: string
 *                     example: "IL"
 *                   pincode:
 *                     type: string
 *                     example: "62704"
 *     responses:
 *       201:
 *         description: Mess created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/MessDetails'
 *       400:
 *         description: Bad request - Invalid owner or missing fields
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/mess/{messId}:
 *   get:
 *     summary: Get Mess details by ID
 *     tags: [Mess]
 *     parameters:
 *       - in: path
 *         name: messId
 *         required: true
 *         schema:
 *           type: string
 *         description: Mess ID to fetch
 *     responses:
 *       200:
 *         description: Mess details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/MessDetails'
 *       400:
 *         description: Invalid Mess ID
 *       404:
 *         description: Mess not found
 *       500:
 *         description: Internal server error
 */

