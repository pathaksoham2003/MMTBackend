/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: User ID
 *         name:
 *           type: string
 *           description: User's full name
 *         avatar:
 *           type: string
 *           description: URL to user's profile picture
 *         role:
 *           type: string
 *           enum: [DELIVERY, MESS_OWNER, CUSTOMER, SUPER_ADMIN]
 *           description: User's role in the system
 *         phone:
 *           type: number
 *           description: User's phone number (10 digits)
 *         email:
 *           type: string
 *           description: User's email address (required when SMS is disabled)
 *         mess_id:
 *           type: string
 *           description: Reference to MessDetails (only for DELIVERY and MESS_OWNER)
 *         addresses:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Address'
 *         is_active:
 *           type: boolean
 *           description: Whether the user account is active
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     
 *     Address:
 *       type: object
 *       properties:
 *         line1:
 *           type: string
 *           description: Address line 1
 *         line2:
 *           type: string
 *           description: Address line 2 (optional)
 *         city:
 *           type: string
 *           description: City name
 *         state:
 *           type: string
 *           description: State name
 *         pincode:
 *           type: string
 *           description: PIN code
 *     
 *     CreateUserRequest:
 *       type: object
 *       required:
 *         - phone
 *         - role
 *       properties:
 *         phone:
 *           type: string
 *           description: 10-digit phone number
 *           example: "9876543210"
 *         role:
 *           type: string
 *           enum: [DELIVERY, MESS_OWNER, CUSTOMER, SUPER_ADMIN]
 *           example: "CUSTOMER"
 *         email:
 *           type: string
 *           description: Email address (required when USE_TWILLIO_SMS=false)
 *           example: "user@example.com"
 *     
 *     VerifyOTPRequest:
 *       type: object
 *       required:
 *         - phone
 *         - otp
 *       properties:
 *         phone:
 *           type: string
 *           description: 10-digit phone number
 *           example: "9876543210"
 *         otp:
 *           type: string
 *           description: 6-digit OTP
 *           example: "123456"
 *         email:
 *           type: string
 *           description: Email address (required when USE_TWILLIO_SMS=false)
 *           example: "user@example.com"
 *     
 *     CompleteProfileRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "John Doe"
 *         avatar:
 *           type: string
 *           example: "https://example.com/avatar.jpg"
 *         addresses:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Address'
 *         mess_id:
 *           type: string
 *           description: Required only for DELIVERY and MESS_OWNER roles
 *           example: "60d5ecb8b392a123456789ab"
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
 *         error:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */

/**
 * @swagger
 * /api/users/create-user:
 *   post:
 *     summary: Create a new user with phone number and send OTP
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *     responses:
 *       201:
 *         description: User created successfully and OTP sent
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
 *                   example: "User created successfully. OTP sent to phone number."
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                     phone:
 *                       type: number
 *                     role:
 *                       type: string
 *                     otpSent:
 *                       type: boolean
 *       400:
 *         description: Bad request - Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal server error or OTP sending failed
 */

/**
 * @swagger
 * /api/users/verify-otp:
 *   post:
 *     summary: Verify OTP for phone number
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyOTPRequest'
 *     responses:
 *       200:
 *         description: OTP verified successfully
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
 *                   example: "OTP verified successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                     phone:
 *                       type: number
 *                     role:
 *                       type: string
 *                     verified:
 *                       type: boolean
 *       400:
 *         description: Invalid OTP or missing fields
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/users/complete-profile/{userId}:
 *   put:
 *     summary: Complete user profile with additional details
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompleteProfileRequest'
 *     responses:
 *       200:
 *         description: Profile updated successfully
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
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request - Invalid input or OTP not verified
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/users/resend-otp:
 *   post:
 *     summary: Resend OTP to phone number or email
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
 *               email:
 *                 type: string
 *                 description: Required when USE_TWILLIO_SMS=false
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: OTP resent successfully
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
 *                   type: object
 *                   properties:
 *                     phone:
 *                       type: number
 *                     otpSent:
 *                       type: boolean
 *       400:
 *         description: User already verified or missing phone
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to send OTP
 */

/**
 * @swagger
 * /api/users/profile/{userId}:
 *   get:
 *     summary: Get user profile by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid user ID
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users with pagination and filters
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of users per page
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [DELIVERY, MESS_OWNER, CUSTOMER, SUPER_ADMIN]
 *         description: Filter by user role
 *       - in: query
 *         name: is_active
 *         schema:
 *           type: boolean
 *         description: Filter by active status
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *                     totalPages:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *                     total:
 *                       type: integer
 */

/**
 * @swagger
 * /api/users/status/{userId}:
 *   patch:
 *     summary: Update user active status (activate/deactivate)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
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
 *         description: User status updated successfully
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
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid user ID or is_active value
 *       404:
 *         description: User not found
 */