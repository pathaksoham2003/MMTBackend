import express from 'express';
import {
  createUser,
  verifyOTP,
  addName,
  addAddress,
  resendOTP,
  getUserProfile,
  getAllUsers,
  updateUserStatus
} from '../controllers/user.js';

const router = express.Router();

// POST /api/users/create-user
router.post('/create-user', createUser);

// POST /api/users/verify-otp
router.post('/verify-otp', verifyOTP);

// PUT /api/users/add-name/:userId
router.put('/add-name/:phone', addName);

// PUT /api/users/add-address/:userId
router.put('/add-address/:phone', addAddress);

// POST /api/users/resend-otp
router.post('/resend-otp', resendOTP);

// GET /api/users/profile/:userId
router.get('/profile/:userId', getUserProfile);

// GET /api/users (with pagination and filters)
router.get('/', getAllUsers);

// PATCH /api/users/status/:userId
router.patch('/status/:userId', updateUserStatus);

export default router;
