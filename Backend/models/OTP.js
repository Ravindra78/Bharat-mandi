const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
        },
        otp: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            default: null,
        },
        purpose: {
            type: String,
            enum: ['registration', 'password_reset', 'email_verification', 'login'],
            default: 'registration',
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        attempts: {
            type: Number,
            default: 0,
        },
        maxAttempts: {
            type: Number,
            default: 5,
        },
        expiresAt: {
            type: Date,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 600, // Auto-delete after 10 minutes
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('OTP', otpSchema);
