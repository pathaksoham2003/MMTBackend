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

/**
 * @swagger
 * /api/mess:
 *   get:
 *     summary: Get all mess details (paginated)
 *     tags: [Mess]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: List of mess details with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 nextPage:
 *                   type: integer
 *                   nullable: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MessDetails'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MessDetails:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         mess_owner:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             name:
 *               type: string
 *             phone:
 *               type: string
 *             email:
 *               type: string
 *             avatar:
 *               type: string
 *         mess_name:
 *           type: string
 *         mess_photos:
 *           type: array
 *           items:
 *             type: string
 *         phone:
 *           type: string
 *         address:
 *           type: object
 *           properties:
 *             line1: { type: string }
 *             line2: { type: string }
 *             city: { type: string }
 *             state: { type: string }
 *             pincode: { type: string }
 *         open:
 *           type: boolean
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */
