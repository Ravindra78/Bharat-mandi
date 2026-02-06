const nodemailer = require('nodemailer');
const logger = require('./logger');

// Support either EMAIL_USER/EMAIL_PASS or GMAIL_EMAIL/GMAIL_APP_PASSWORD
const mailUser = (process.env.EMAIL_USER || process.env.GMAIL_EMAIL || '').trim();
const mailPass = (process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, '').trim();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: mailUser,
        pass: mailPass,
    },
});

exports.sendEmail = async (to, subject, html, text = null) => {
    try {
        if (!to || !subject) {
            throw new Error('Email address and subject are required');
        }

        const mailOptions = {
            from: mailUser || process.env.GMAIL_EMAIL || 'no-reply@bharat-mandi.com',
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