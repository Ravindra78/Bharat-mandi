const crypto = require('crypto');
const logger = require('./logger');
const emailSender = require('./emailSender');

/**
 * Generate a random 6-digit OTP
 * @returns {string} - 6-digit OTP code
 */
exports.generateOtpCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Generate OTP with expiry time
 * @param {number} expiryMinutes - OTP expiry time in minutes (default: 10)
 * @returns {object} - { otpCode, otpExpiry }
 */
exports.generateOtp = (expiryMinutes = 10) => {
    try {
        const otpCode = this.generateOtpCode();
        const otpExpiry = new Date(Date.now() + expiryMinutes * 60000); // Minutes to milliseconds
        
        logger.info(`OTP generated: ${otpCode} with expiry at ${otpExpiry}`);
        
        return {
            otpCode,
            otpExpiry,
        };
    } catch (err) {
        logger.error(`Error generating OTP: ${err.message}`);
        throw err;
    }
};

/**
 * Send OTP via email
 * @param {string} email - User email address
 * @param {string} otpCode - OTP code to send
 * @returns {Promise<boolean>}
 */
exports.sendOtpViaEmail = async (email, otpCode) => {
    try {
        const subject = 'Your OTP Code - Bharat Mandi';
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>OTP Verification - Bharat Mandi</h2>
                <p>Hello,</p>
                <p>Your One-Time Password (OTP) is:</p>
                <h1 style="color: #4CAF50; font-size: 32px; letter-spacing: 5px;">${otpCode}</h1>
                <p><strong>This OTP will expire in 10 minutes.</strong></p>
                <p>If you didn't request this OTP, please ignore this email.</p>
                <hr style="margin: 20px 0;">
                <p style="color: #666; font-size: 12px;">© 2026 Bharat Mandi. All rights reserved.</p>
            </div>
        `;

        await emailSender.sendEmail(email, subject, htmlContent);
        logger.info(`OTP sent to email: ${email}`);
        return true;
    } catch (err) {
        logger.error(`Error sending OTP email: ${err.message}`);
        throw err;
    }
};

/**
 * Send OTP via SMS
 * @param {string} phone - User phone number
 * @param {string} otpCode - OTP code to send
 * @returns {Promise<boolean>}
 */
exports.sendOtpViaSMS = async (phone, otpCode) => {
    try {
        // Integration with SMS service (Twilio, AWS SNS, etc.)
        // For now, just logging the action
        logger.info(`OTP sent to phone: ${phone}, OTP: ${otpCode}`);
        
        // Example with Twilio (uncomment if using Twilio):
        // const twilio = require('twilio');
        // const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        // await client.messages.create({
        //     body: `Your Bharat Mandi OTP is: ${otpCode}. Valid for 10 minutes.`,
        //     from: process.env.TWILIO_PHONE_NUMBER,
        //     to: phone
        // });
        
        return true;
    } catch (err) {
        logger.error(`Error sending OTP SMS: ${err.message}`);
        throw err;
    }
};

/**
 * Verify OTP code
 * @param {string} enteredOtp - OTP entered by user
 * @param {string} storedOtp - OTP stored in database
 * @param {Date} otpExpiry - OTP expiry time
 * @returns {object} - { isValid: boolean, message: string }
 */
exports.verifyOtpCode = (enteredOtp, storedOtp, otpExpiry) => {
    try {
        // Check if OTP exists
        if (!storedOtp) {
            return { isValid: false, message: 'No OTP found. Please request a new OTP.' };
        }

        // Check if OTP has expired
        if (new Date() > otpExpiry) {
            return { isValid: false, message: 'OTP has expired. Please request a new OTP.' };
        }

        // Check if OTP matches
        if (enteredOtp !== storedOtp) {
            return { isValid: false, message: 'Invalid OTP. Please try again.' };
        }

        logger.info(`OTP verified successfully`);
        return { isValid: true, message: 'OTP verified successfully.' };
    } catch (err) {
        logger.error(`Error verifying OTP: ${err.message}`);
        throw err;
    }
};

/**
 * Clear OTP from user record
 * @param {object} user - User object
 * @returns {object} - Updated user
 */
exports.clearOtp = (user) => {
    user.otpCode = null;
    user.otpExpiry = null;
    user.otpAttempts = 0;
    return user;
};

/**
 * Check if OTP request is rate limited
 * @param {number} attempts - Current attempt count
 * @param {number} maxAttempts - Maximum allowed attempts (default: 5)
 * @returns {boolean} - true if rate limited
 */
exports.isRateLimited = (attempts, maxAttempts = 5) => {
    return attempts >= maxAttempts;
};
