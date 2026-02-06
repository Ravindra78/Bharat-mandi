const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['buyer', 'seller', 'admin'],
            default: 'buyer',
        },
        address: {
            street: String,
            city: String,
            state: String,
            pincode: String,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        profilePicture: {
            type: String,
            default: null,
        },
        // OTP Fields
        otpCode: {
            type: String,
            default: null,
        },
        otpExpiry: {
            type: Date,
            default: null,
        },
        isOtpVerified: {
            type: Boolean,
            default: false,
        },
        otpAttempts: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
