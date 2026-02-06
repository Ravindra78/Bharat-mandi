const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

// Create transporter for Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD, // Use App Password, not regular password
    },
});

// Verify transporter connection
transporter.verify((error, success) => {
    if (error) {
        logger.error(`Gmail connection error: ${error.message}`);
    } else {
        logger.info('Gmail SMTP connection established');
    }
});

/**
 * Generate a random 6-digit OTP
 */
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Send OTP via email using Gmail
 */
const sendOtpEmail = async (email, otp, purpose = 'registration') => {
    try {
        const subject = `Your Bharat Mandi ${purpose.replace('_', ' ').toUpperCase()} OTP Code`;
        
        const htmlTemplate = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background-color: #f5f5f5; padding: 20px; text-align: center;">
                    <h2 style="color: #333;">Bharat Mandi</h2>
                </div>
                <div style="padding: 30px; background-color: #fff; text-align: center;">
                    <h3 style="color: #333;">Your OTP Code</h3>
                    <p style="color: #666; font-size: 14px;">Your One-Time Password for ${purpose.replace('_', ' ')} is:</p>
                    <div style="background-color: #f0f0f0; padding: 15px; margin: 20px 0; border-radius: 5px;">
                        <h1 style="color: #27ae60; letter-spacing: 5px; margin: 0;">${otp}</h1>
                    </div>
                    <p style="color: #666; font-size: 14px;">This code will expire in 10 minutes.</p>
                    <p style="color: #999; font-size: 12px;">Do not share this code with anyone.</p>
                </div>
                <div style="background-color: #f5f5f5; padding: 15px; text-align: center; color: #666; font-size: 12px;">
                    <p>© 2026 Bharat Mandi. All rights reserved.</p>
                </div>
            </div>
        `;

        const mailOptions = {
            from: process.env.GMAIL_EMAIL,
            to: email,
            subject: subject,
            html: htmlTemplate,
        };

        const result = await transporter.sendMail(mailOptions);
        logger.info(`OTP sent to ${email} for ${purpose}`);
        return { success: true, messageId: result.messageId };
    } catch (error) {
        logger.error(`Failed to send OTP email: ${error.message}`);
        throw new Error(`Failed to send OTP: ${error.message}`);
    }
};

/**
 * Send verification email after OTP verification
 */
const sendWelcomeEmail = async (email, name) => {
    try {
        const htmlTemplate = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background-color: #f5f5f5; padding: 20px; text-align: center;">
                    <h2 style="color: #333;">Bharat Mandi</h2>
                </div>
                <div style="padding: 30px; background-color: #fff;">
                    <h3 style="color: #333;">Welcome to Bharat Mandi, ${name}!</h3>
                    <p style="color: #666;">Your email has been successfully verified.</p>
                    <p style="color: #666;">You can now login and start buying/selling agricultural products.</p>
                    <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}" style="display: inline-block; background-color: #27ae60; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 10px;">Go to Dashboard</a>
                </div>
                <div style="background-color: #f5f5f5; padding: 15px; text-align: center; color: #666; font-size: 12px;">
                    <p>© 2026 Bharat Mandi. All rights reserved.</p>
                </div>
            </div>
        `;

        const mailOptions = {
            from: process.env.GMAIL_EMAIL,
            to: email,
            subject: 'Welcome to Bharat Mandi - Email Verified ✓',
            html: htmlTemplate,
        };

        await transporter.sendMail(mailOptions);
        logger.info(`Welcome email sent to ${email}`);
    } catch (error) {
        logger.error(`Failed to send welcome email: ${error.message}`);
    }
};

const otpService = {
    generateOTP,
    sendOtpEmail,
    sendWelcomeEmail,
};

module.exports = otpService;
