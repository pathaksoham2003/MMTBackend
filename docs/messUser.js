/**
 * @swagger
 * /api/users/mess-owner:
 *   post:
 *     summary: Create a new MESS_OWNER user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               phone:
 *                 type: number
 *                 example: 9876543210
 *               email:
 *                 type: string
 *                 example: "messowner@example.com"
 *               is_active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Mess owner created successfully
 *       400:
 *         description: Missing phone
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/delivery:
 *   post:
 *     summary: Create a new DELIVERY user linked to a mess
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - mess_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Delivery Guy"
 *               phone:
 *                 type: number
 *                 example: 9876543211
 *               email:
 *                 type: string
 *                 example: "delivery@example.com"
 *               mess_id:
 *                 type: string
 *                 example: "60d5ecb8b392a123456789ab"
 *     responses:
 *       201:
 *         description: Delivery user created successfully
 *       400:
 *         description: Missing phone or mess_id
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/mess-owner/status/{userId}:
 *   patch:
 *     summary: Update MESS_OWNER active/inactive status
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: Mess owner user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - is_active
 *             properties:
 *               is_active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Mess owner status updated successfully
 *       400:
 *         description: Invalid user ID
 *       404:
 *         description: Mess owner not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/delivery/status/{userId}:
 *   patch:
 *     summary: Update DELIVERY user active/inactive status
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: Delivery user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - is_active
 *             properties:
 *               is_active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Delivery user status updated successfully
 *       400:
 *         description: Invalid user ID
 *       404:
 *         description: Delivery user not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/users/mess-owner/login:
 *   post:
 *     summary: Login Mess Owner (send OTP)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *             properties:
 *               phone:
 *                 type: number
 *                 example: 9876543210
 *     responses:
 *       200:
 *         description: OTP sent successfully (Debug mode: OTP = 111111)
 *       400:
 *         description: Invalid phone number
 *       403:
 *         description: Phone number not registered as Mess Owner
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/mess-owner/verify-otp:
 *   post:
 *     summary: Verify OTP and login Mess Owner
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - otp
 *             properties:
 *               phone:
 *                 type: number
 *                 example: 9876543210
 *               otp:
 *                 type: number
 *                 example: 111111
 *     responses:
 *       200:
 *         description: OTP verified, user logged in successfully
 *       400:
 *         description: Phone and OTP required
 *       401:
 *         description: Invalid OTP
 *       404:
 *         description: Mess owner not found
 *       500:
 *         description: Internal server error
 */