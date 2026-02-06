const nodemailer = require('nodemailer');
const logger = require('./logger');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendEmail = async (to, subject, html, text = null) => {
    try {
        if (!to || !subject) {
            throw new Error('Email address and subject are required');
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            ...(html && { html }),
            ...(text && { text }),
        };

        const result = await transporter.sendMail(mailOptions);
        logger.info(`Email sent to ${to} - Message ID: ${result.messageId}`);
        return result;
    } catch (err) {
        logger.error(`Email error for ${to}: ${err.message}`);
        throw new Error(`Failed to send email: ${err.message}`);
    }
};