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
 * /api/users/login:
 *   post:
 *     summary: Login as a Mess Owner (send OTP)
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
 *                 type: string
 *                 example: "9876543210"
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: OTP sent successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     phone:
 *                       type: string
 *                       example: "9876543210"
 *                     role:
 *                       type: string
 *                       example: "MESS_OWNER"
 *                     otpSent:
 *                       type: boolean
 *                       example: true
 *                     debugOtp:
 *                       type: number
 *                       example: 1111
 *       400:
 *         description: Invalid phone
 *       403:
 *         description: Not registered as Mess Owner
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/verify-otp:
 *   post:
 *     summary: Verify Mess Owner OTP and login
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
 *                 type: string
 *                 example: "9876543210"
 *               otp:
 *                 type: number
 *                 example: 1111
 *     responses:
 *       200:
 *         description: OTP verified successfully, returns mess owner details with mess info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Mess user logged in successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "64d5ecb8b392a123456789ab"
 *                         name:
 *                           type: string
 *                           example: "John Doe"
 *                         phone:
 *                           type: string
 *                           example: "9876543210"
 *                         role:
 *                           type: string
 *                           example: "MESS_OWNER"
 *                         email:
 *                           type: string
 *                           example: "messowner@example.com"
 *                         gender:
 *                           type: string
 *                           example: "Male"
 *                         dob:
 *                           type: string
 *                           format: date
 *                           example: "1990-01-01"
 *                     mess:
 *                       type: object
 *                       description: Mess details of the owner
 *       400:
 *         description: Missing phone or OTP
 *       401:
 *         description: Invalid OTP
 *       404:
 *         description: Mess owner not found / mess details not found
 *       500:
 *         description: Internal server error
 */
