// routes/user.route.js
const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  userDetaile,
  forgotPassword,
  resetPassword,
} = require('../controllers/user.controller');
const { protect } = require('../middleware/authMiddleware');

// Register a new user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);
router.get('/userdetaile/:id', userDetaile);

// Forgot password
router.post('/forgot-password', forgotPassword);

// Reset password
router.put('/reset-password/:id/:token', resetPassword);

module.exports = router;