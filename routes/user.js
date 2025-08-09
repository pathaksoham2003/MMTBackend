
import express from 'express';
import {
  createUser,
  verifyOTP,
  completeProfile,
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

// PUT /api/users/complete-profile/:userId
router.put('/complete-profile/:userId', completeProfile);

// POST /api/users/resend-otp
router.post('/resend-otp', resendOTP);

// GET /api/users/profile/:userId
router.get('/profile/:userId', getUserProfile);

// GET /api/users (with pagination and filters)
router.get('/', getAllUsers);

// PATCH /api/users/status/:userId
router.patch('/status/:userId', updateUserStatus);

export default router;