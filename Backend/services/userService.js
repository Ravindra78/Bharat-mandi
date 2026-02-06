const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const otpHelper = require('../utils/otpHelper');

exports.registerUser = async (userData) => {
    try {
        const { name, email, password, phone, role = 'buyer', address, adminCode } = userData;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        // Validate admin registration
        if (role === 'admin') {
            const validAdminCode = process.env.ADMIN_SECRET_CODE;
            if (!validAdminCode) {
                const error = new Error('Admin registration is not currently available');
                error.statusCode = 403;
                throw error;
            }
            if (!adminCode || adminCode !== validAdminCode) {
                const error = new Error('Invalid admin authorization code');
                error.statusCode = 403;
                throw error;
            }
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            role,
            address,
        });

        await user.save();
        logger.info(`User registered: ${email} with role: ${role}`);
        return { id: user._id, name, email, phone, role };
    } catch (err) {
        logger.error(`Registration error: ${err.message}`);
        throw err;
    }
};

exports.loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        // Verify password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            const error = new Error('Invalid password');
            error.statusCode = 401;
            throw error;
        }

        // Generate JWT with role included
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        logger.info(`User logged in: ${email}`);
        return {
            token,
            user: { id: user._id, name: user.name, email, phone: user.phone, role: user.role }
        };
    } catch (err) {
        logger.error(`Login error: ${err.message}`);
        throw err;
    }
};

exports.getUserById = async (userId) => {
    try {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        return user;
    } catch (err) {
        logger.error(`Get user error: ${err.message}`);
        throw err;
    }
};

exports.updateUser = async (userId, updateData) => {
    try {
        const user = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
        logger.info(`User updated: ${userId}`);
        return user;
    } catch (err) {
        logger.error(`Update user error: ${err.message}`);
        throw err;
    }
};

exports.getAllUsers = async () => {
    try {
        const users = await User.find({ isActive: true }).select('-password');
        return users;
    } catch (err) {
        logger.error(`Get all users error: ${err.message}`);
        throw err;
    }
};

// OTP Related Functions

/**
 * Send OTP to user email
 * @param {string} email - User email
 * @returns {object} - { message: string, otpExpiry: Date }
 */
exports.sendOtpToEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        // Check rate limiting (max 5 attempts)
        if (otpHelper.isRateLimited(user.otpAttempts)) {
            const error = new Error('Too many OTP requests. Please try again later.');
            error.statusCode = 429;
            throw error;
        }

        // Generate OTP
        const { otpCode, otpExpiry } = otpHelper.generateOtp(10); // 10 minutes expiry

        // Update user with OTP
        user.otpCode = otpCode;
        user.otpExpiry = otpExpiry;
        user.otpAttempts = (user.otpAttempts || 0) + 1;
        await user.save();

        // Send OTP via email
        await otpHelper.sendOtpViaEmail(email, otpCode);

        logger.info(`OTP sent to user: ${email}`);
        return {
            message: 'OTP sent successfully to your email',
            otpExpiry,
        };
    } catch (err) {
        logger.error(`Send OTP error: ${err.message}`);
        throw err;
    }
};

/**
 * Send OTP to user phone
 * @param {string} phone - User phone number
 * @returns {object} - { message: string, otpExpiry: Date }
 */
exports.sendOtpToPhone = async (phone) => {
    try {
        const user = await User.findOne({ phone });
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        // Check rate limiting
        if (otpHelper.isRateLimited(user.otpAttempts)) {
            const error = new Error('Too many OTP requests. Please try again later.');
            error.statusCode = 429;
            throw error;
        }

        // Generate OTP
        const { otpCode, otpExpiry } = otpHelper.generateOtp(10);

        // Update user with OTP
        user.otpCode = otpCode;
        user.otpExpiry = otpExpiry;
        user.otpAttempts = (user.otpAttempts || 0) + 1;
        await user.save();

        // Send OTP via SMS
        await otpHelper.sendOtpViaSMS(phone, otpCode);

        logger.info(`OTP sent to user phone: ${phone}`);
        return {
            message: 'OTP sent successfully to your phone',
            otpExpiry,
        };
    } catch (err) {
        logger.error(`Send OTP to phone error: ${err.message}`);
        throw err;
    }
};

/**
 * Verify OTP code
 * @param {string} email - User email
 * @param {string} otpCode - OTP code to verify
 * @returns {object} - { message: string, isVerified: boolean }
 */
exports.verifyOtpCode = async (email, otpCode) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        // Verify OTP
        const verification = otpHelper.verifyOtpCode(otpCode, user.otpCode, user.otpExpiry);

        if (!verification.isValid) {
            const error = new Error(verification.message);
            error.statusCode = 400;
            throw error;
        }

        // Clear OTP and mark as verified
        user.otpCode = null;
        user.otpExpiry = null;
        user.isOtpVerified = true;
        user.otpAttempts = 0;
        await user.save();

        logger.info(`OTP verified for user: ${email}`);
        return {
            message: 'OTP verified successfully',
            isVerified: true,
        };
    } catch (err) {
        logger.error(`Verify OTP error: ${err.message}`);
        throw err;
    }
};

/**
 * Validate OTP (without marking as verified - for additional checks)
 * @param {string} email - User email
 * @param {string} otpCode - OTP code to validate
 * @returns {object} - { isValid: boolean, message: string }
 */
exports.validateOtpCode = async (email, otpCode) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        // Validate OTP (just check, don't mark as verified)
        const validation = otpHelper.verifyOtpCode(otpCode, user.otpCode, user.otpExpiry);

        if (!validation.isValid) {
            logger.warn(`Invalid OTP attempt for user: ${email}`);
            const error = new Error(validation.message);
            error.statusCode = 400;
            throw error;
        }

        logger.info(`OTP validated for user: ${email}`);
        return {
            isValid: true,
            message: validation.message,
        };
    } catch (err) {
        logger.error(`Validate OTP error: ${err.message}`);
        throw err;
    }
};

/**
 * Check if user's OTP is verified
 * @param {string} email - User email
 * @returns {boolean} - true if verified
 */
exports.isOtpVerified = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return false;
        }
        return user.isOtpVerified;
    } catch (err) {
        logger.error(`Check OTP verification error: ${err.message}`);
        return false;
    }
};

