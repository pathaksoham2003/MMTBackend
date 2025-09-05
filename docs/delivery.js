/**
 * @swagger
 * tags:
 *   name: Delivery
 *   description: Delivery boy related APIs
 */

/**
 * @swagger
 * /api/delivery/delivery/{deliveryBoyId}:
 *   get:
 *     summary: Get all orders assigned to a delivery boy
 *     tags: [Delivery]
 *     parameters:
 *       - in: path
 *         name: deliveryBoyId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the delivery boy (User)
 *     responses:
 *       200:
 *         description: List of orders assigned to the delivery boy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       order_id:
 *                         type: string
 *                         example: "64f23e..."
 *                       customer:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Soham Pathak"
 *                           phone:
 *                             type: number
 *                             example: 7887557175
 *                       address:
 *                         type: object
 *                         properties:
 *                           line1:
 *                             type: string
 *                             example: "123 Street"
 *                           line2:
 *                             type: string
 *                             example: "Near Market"
 *                           city:
 *                             type: string
 *                             example: "Pune"
 *                           state:
 *                             type: string
 *                             example: "MH"
 *                           pincode:
 *                             type: string
 *                             example: "411001"
 *                           label:
 *                             type: string
 *                             example: "Home"
 *                       amount:
 *                         type: number
 *                         example: 250
 *                       tiffin_type:
 *                         type: string
 *                         example: "VEG_TIFFIN"
 *                       items:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Dal", "Rice", "Chapati"]
 *                       status:
 *                         type: string
 *                         enum: [IN_PROCESS, OUT_FOR_DELIVERY, DELIVERED, UN_DELIVERED, RETURNED]
 *                         example: "OUT_FOR_DELIVERY"
 *                       order_time:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-09-05T14:20:00.123Z"
 *       400:
 *         description: Delivery boy ID missing or invalid
 *       404:
 *         description: No orders found for this delivery boy
 *       500:
 *         description: Internal server error
 */
