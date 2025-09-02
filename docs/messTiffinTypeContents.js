/**
 * @swagger
 * tags:
 *   name: Mess Tiffin Type Contents
 *   description: API for managing mess tiffin type contents
 */
/**
 * @swagger
 * /api/mess-tiffin-type-content:
 *   get:
 *     summary: Get mess tiffin type contents
 *     description: Fetches the tiffin contents for a specific mess by `mess_id` and `type`.
 *     tags: [Mess Tiffin Type Contents]
 *     parameters:
 *       - in: query
 *         name: mess_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the mess
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [NORMAL, SPECIAL]
 *         required: true
 *         description: Type of the tiffin (NORMAL or SPECIAL)
 *     responses:
 *       200:
 *         description: Successfully fetched tiffin type contents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   quantity:
 *                     type: number
 *                   unit:
 *                     type: string
 *                   photo:
 *                     type: string
 *                   approx_nutrition_per_item:
 *                     type: object
 *       400:
 *         description: Error with the tiffin content
 *       404:
 *         description: Tiffin content not found
 */

/**
 * @swagger
 * /api/mess-tiffin-type-content:
 *   post:
 *     summary: Create new mess tiffin type content
 *     description: Creates tiffin contents for a mess for a given type (NORMAL or SPECIAL).
 *     tags: [Mess Tiffin Type Contents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mess_id
 *               - type
 *               - general_contents
 *             properties:
 *               mess_id:
 *                 type: string
 *                 description: ID of the mess
 *               type:
 *                 type: string
 *                 enum: [NORMAL, SPECIAL]
 *                 description: Type of tiffin
 *               general_contents:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     quantity:
 *                       type: number
 *                     unit:
 *                       type: string
 *                     photo:
 *                       type: string
 *                     approx_nutrition_per_item:
 *                       type: object
 *     responses:
 *       201:
 *         description: Tiffin type content created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 mess_id:
 *                   type: string
 *                 type:
 *                   type: string
 *                 general_contents:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       quantity:
 *                         type: number
 *                       unit:
 *                         type: string
 *                       photo:
 *                         type: string
 *                       approx_nutrition_per_item:
 *                         type: object
 *       400:
 *         description: Error creating tiffin content
 */