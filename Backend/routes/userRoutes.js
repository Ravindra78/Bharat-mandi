const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// OTP Routes (Public)
router.post('/otp/send-email', userController.sendOtpToEmail);
router.post('/otp/send-sms', userController.sendOtpToPhone);
router.post('/otp/verify', userController.verifyOtp);
router.post('/otp/validate', userController.validateOtp);
router.get('/otp/status/:email', userController.checkOtpStatus);


// Protected routes
router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);
router.get('/all', auth, userController.getAllUsers);

module.exports = router;