const validator = require('validator');
const mongoSanitize = require('express-mongo-sanitize');

// Middleware to sanitize data
const sanitizeData = mongoSanitize({
    replaceWith: '_',
    onSanitize: ({ req, key }) => {
        console.log(`Sanitized field: ${key}`);
    }
});

// Validate email
const validateEmail = (email) => {
    if (!email || !validator.isEmail(email)) {
        throw new Error('Invalid email address');
    }
    return validator.normalizeEmail(email);
};

// Validate password
const validatePassword = (password) => {
    if (!password || password.length < 6) {
        throw new Error('Password must be at least 6 characters');
    }
    return password;
};

// Validate phone number
const validatePhone = (phone) => {
    if (!phone || !validator.isMobilePhone(phone)) {
        throw new Error('Invalid phone number');
    }
    return phone;
};

// Validate input fields
const validateInputs = (data) => {
    const errors = {};
    
    if (data.email && !validator.isEmail(data.email)) {
        errors.email = 'Invalid email';
    }
    if (data.password && !validator.isLength(data.password, { min: 6 })) {
        errors.password = 'Password must be at least 6 characters';
    }
    if (data.phone && !validator.isMobilePhone(data.phone)) {
        errors.phone = 'Invalid phone number';
    }
    
    return { isValid: Object.keys(errors).length === 0, errors };
};

module.exports = {
    sanitizeData,
    validateEmail,
    validatePassword,
    validatePhone,
    validateInputs
};