const OTP = require('../models/OTP');
const User = require('../models/User');
const otpService = require('../services/otpService');
const logger = require('../utils/logger');

/**
 * Send OTP to email
 */
exports.sendOtpToEmail = async (req, res) => {
    try {
        const { email, purpose = 'registration' } = req.body;

        if (!email) {
            return res.status(400).json({ msg: 'Email is required' });
        }

        // Check if user already exists for registration
        if (purpose === 'registration') {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ msg: 'User already registered with this email' });
            }
        }

        // Generate OTP
        const otp = otpService.generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Remove old OTP for this email
        await OTP.deleteMany({ email });

        // Save OTP to database
        const otpRecord = new OTP({
            email,
            otp,
            purpose,
            expiresAt,
        });

        await otpRecord.save();

        // Send OTP via email
        await otpService.sendOtpEmail(email, otp, purpose);

        logger.info(`OTP sent to ${email} for ${purpose}`);
        res.json({
            success: true,
            message: `OTP sent to ${email}`,
            expiresIn: '10 minutes',
        });
    } catch (error) {
        logger.error(`Send OTP error: ${error.message}`);
        res.status(500).json({ msg: error.message });
    }
};

/**
 * Verify OTP (check if OTP is correct)
 */
exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ msg: 'Email and OTP are required' });
        }

        // Find OTP record
        const otpRecord = await OTP.findOne({ email, otp });

        if (!otpRecord) {
            logger.warn(`Invalid OTP attempt for ${email}`);
            await OTP.updateOne({ email }, { $inc: { attempts: 1 } });
            return res.status(400).json({ msg: 'Invalid OTP' });
        }

        // Check if OTP is expired
        if (new Date() > otpRecord.expiresAt) {
            await OTP.deleteOne({ _id: otpRecord._id });
            logger.warn(`Expired OTP for ${email}`);
            return res.status(400).json({ msg: 'OTP has expired' });
        }

        // Check if max attempts exceeded
        if (otpRecord.attempts >= otpRecord.maxAttempts) {
            await OTP.deleteOne({ _id: otpRecord._id });
            return res.status(400).json({ msg: 'Max OTP attempts exceeded. Request a new OTP.' });
        }

        // Mark as verified
        otpRecord.isVerified = true;
        await otpRecord.save();

        logger.info(`OTP verified for ${email}`);
        res.json({
            success: true,
            message: 'OTP verified successfully',
            verified: true,
        });
    } catch (error) {
        logger.error(`Verify OTP error: ${error.message}`);
        res.status(500).json({ msg: error.message });
    }
};

/**
 * Validate OTP (alternative endpoint for checking OTP validity)
 */
exports.validateOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ msg: 'Email and OTP are required' });
        }

        const otpRecord = await OTP.findOne({ email });

        if (!otpRecord) {
            return res.status(404).json({ msg: 'No OTP found for this email' });
        }

        if (new Date() > otpRecord.expiresAt) {
            await OTP.deleteOne({ _id: otpRecord._id });
            return res.status(400).json({ msg: 'OTP has expired' });
        }

        if (otpRecord.otp !== otp) {
            otpRecord.attempts += 1;
            await otpRecord.save();
            return res.status(400).json({ 
                msg: 'Invalid OTP',
                attemptsRemaining: otpRecord.maxAttempts - otpRecord.attempts
            });
        }

        res.json({
            success: true,
            message: 'OTP is valid',
            isValid: true,
        });
    } catch (error) {
        logger.error(`Validate OTP error: ${error.message}`);
        res.status(500).json({ msg: error.message });
    }
};

/**
 * Check OTP status for an email
 */
exports.checkOtpStatus = async (req, res) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({ msg: 'Email is required' });
        }

        const otpRecord = await OTP.findOne({ email });

        if (!otpRecord) {
            return res.status(404).json({ msg: 'No OTP found for this email' });
        }

        const isExpired = new Date() > otpRecord.expiresAt;

        res.json({
            email,
            isVerified: otpRecord.isVerified,
            isExpired,
            purpose: otpRecord.purpose,
            attemptsRemaining: otpRecord.maxAttempts - otpRecord.attempts,
        });
    } catch (error) {
        logger.error(`Check OTP status error: ${error.message}`);
        res.status(500).json({ msg: error.message });
    }
};

/**
 * Send OTP to phone (placeholder for SMS service)
 */
exports.sendOtpToPhone = async (req, res) => {
    try {
        const { phone, purpose = 'registration' } = req.body;

        if (!phone) {
            return res.status(400).json({ msg: 'Phone number is required' });
        }

        // This is a placeholder. You can integrate with services like Twilio, AWS SNS, etc.
        logger.info(`SMS OTP requested for ${phone} - SMS service not configured`);
        
        res.status(503).json({ 
            msg: 'SMS service not configured. Please use email OTP instead.',
            note: 'To enable SMS, configure Twilio or another SMS provider'
        });
    } catch (error) {
        logger.error(`Send OTP to phone error: ${error.message}`);
        res.status(500).json({ msg: error.message });
    }
};
