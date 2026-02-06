const userService = require('../services/userService');
const logger = require('../utils/logger');

exports.register = async (req, res) => {
    try {
        const user = await userService.registerUser(req.body);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        logger.error(err.message);
        res.status(err.statusCode || 500).json({ msg: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await userService.loginUser(email, password);
        res.json(result);
    } catch (err) {
        logger.error(err.message);
        res.status(err.statusCode || 500).json({ msg: err.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await userService.getUserById(req.user.id);
        res.json(user);
    } catch (err) {
        logger.error(err.message);
        res.status(err.statusCode || 500).json({ msg: err.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const user = await userService.updateUser(req.user.id, req.body);
        res.json({ message: 'Profile updated successfully', user });
    } catch (err) {
        logger.error(err.message);
        res.status(err.statusCode || 500).json({ msg: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ msg: err.message });
    }
};

// OTP Related Controllers

/**
 * Send OTP to user email
 * POST /api/users/otp/send-email
 * Body: { email: string }
 */
exports.sendOtpToEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ msg: 'Email is required' });
        }

        const result = await userService.sendOtpToEmail(email);
        res.json(result);
    } catch (err) {
        logger.error(err.message);
        res.status(err.statusCode || 500).json({ msg: err.message });
    }
};

/**
 * Send OTP to user phone
 * POST /api/users/otp/send-sms
 * Body: { phone: string }
 */
exports.sendOtpToPhone = async (req, res) => {
    try {
        const { phone } = req.body;

        if (!phone) {
            return res.status(400).json({ msg: 'Phone number is required' });
        }

        const result = await userService.sendOtpToPhone(phone);
        res.json(result);
    } catch (err) {
        logger.error(err.message);
        res.status(err.statusCode || 500).json({ msg: err.message });
    }
};

/**
 * Verify OTP code
 * POST /api/users/otp/verify
 * Body: { email: string, otpCode: string }
 */
exports.verifyOtp = async (req, res) => {
    try {
        const { email, otpCode } = req.body;

        if (!email || !otpCode) {
            return res.status(400).json({ msg: 'Email and OTP code are required' });
        }

        const result = await userService.verifyOtpCode(email, otpCode);
        res.json(result);
    } catch (err) {
        logger.error(err.message);
        res.status(err.statusCode || 500).json({ msg: err.message });
    }
};

/**
 * Validate OTP code (without marking as verified)
 * POST /api/users/otp/validate
 * Body: { email: string, otpCode: string }
 */
exports.validateOtp = async (req, res) => {
    try {
        const { email, otpCode } = req.body;

        if (!email || !otpCode) {
            return res.status(400).json({ msg: 'Email and OTP code are required' });
        }

        const result = await userService.validateOtpCode(email, otpCode);
        res.json(result);
    } catch (err) {
        logger.error(err.message);
        res.status(err.statusCode || 500).json({ msg: err.message });
    }
};

/**
 * Check OTP verification status
 * GET /api/users/otp/status/:email
 */
exports.checkOtpStatus = async (req, res) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({ msg: 'Email is required' });
        }

        const isVerified = await userService.isOtpVerified(email);
        res.json({
            email,
            isOtpVerified: isVerified,
        });
    } catch (err) {
        logger.error(err.message);
        res.status(err.statusCode || 500).json({ msg: err.message });
    }
};

