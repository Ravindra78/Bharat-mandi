const userService = require('../services/userService');
const otpController = require('./otpController');
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

// OTP Related Controllers - Delegated to otpController
exports.sendOtpToEmail = otpController.sendOtpToEmail;
exports.sendOtpToPhone = otpController.sendOtpToPhone;
exports.verifyOtp = otpController.verifyOtp;
exports.validateOtp = otpController.validateOtp;
exports.checkOtpStatus = otpController.checkOtpStatus;

