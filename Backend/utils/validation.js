const Joi = require('joi');

exports.userRegisterSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('farmer', 'buyer').required(),
  aadhaarNumber: Joi.string().length(12).optional(),
});

exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.kycSchema = Joi.object({
    aadhaarNumber: Joi.string()
        .length(12)
        .pattern(/^\d+$/)
        .required()
        .messages({
            'string.pattern.base': 'Aadhaar number must contain only digits',
            'string.length': 'Aadhaar number must be exactly 12 digits',
        }),
    otp: Joi.string()
        .length(6)
        .pattern(/^\d+$/)
        .required()
        .messages({
            'string.pattern.base': 'OTP must contain only digits',
            'string.length': 'OTP must be exactly 6 digits',
        }),
});