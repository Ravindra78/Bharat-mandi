const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

exports.registerUser = async (userData) => {
    try {
        const { name, email, password, phone } = userData;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            phone,
        });

        await user.save();
        logger.info(`User registered: ${email}`);
        return { id: user._id, name, email, phone };
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

        // Generate JWT
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        logger.info(`User logged in: ${email}`);
        return { token, user: { id: user._id, name: user.name, email, phone: user.phone } };
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
