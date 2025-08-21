/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Location ID
 *         name:
 *           type: string
 *           description: Location name (e.g., Andheri)
 *           example: "Andheri"
 *         coordinates:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *               example: 19.1136
 *             longitude:
 *               type: number
 *               example: 72.8697
 *         radius:
 *           type: number
 *           description: Accessible radius in meters
 *           example: 1000
 *         is_active:
 *           type: boolean
 *           description: Whether this location is active
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CreateLocationRequest:
 *       type: object
 *       required:
 *         - name
 *         - latitude
 *         - longitude
 *         - radius
 *       properties:
 *         name:
 *           type: string
 *           example: "Andheri"
 *         latitude:
 *           type: number
 *           example: 19.1136
 *         longitude:
 *           type: number
 *           example: 72.8697
 *         radius:
 *           type: number
 *           example: 1000
 *
 *     CheckLocationRequest:
 *       type: object
 *       required:
 *         - latitude
 *         - longitude
 *       properties:
 *         latitude:
 *           type: number
 *           example: 19.1138
 *         longitude:
 *           type: number
 *           example: 72.8699
 *
 *     ApiResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           type: object
 */

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Manage geographical locations and accessibility radius
 */

/**
 * @swagger
 * /api/locations:
 *   post:
 *     summary: Create a new location
 *     tags: [Locations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateLocationRequest'
 *     responses:
 *       201:
 *         description: Location created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 *   get:
 *     summary: Get all locations
 *     tags: [Locations]
 *     responses:
 *       200:
 *         description: List of all locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/locations/{id}/toggle:
 *   patch:
 *     summary: Toggle a location's active status
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Location ID
 *     responses:
 *       200:
 *         description: Location status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: Location not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/locations/check:
 *   post:
 *     summary: Check if a user coordinate is within any active location
 *     tags: [Locations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CheckLocationRequest'
 *     responses:
 *       200:
 *         description: Location check result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 insideLocation:
 *                   type: boolean
 *                 location:
 *                   $ref: '#/components/schemas/Location'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
