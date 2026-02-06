const Payment = require('../models/Payment');
const logger = require('../utils/logger');

exports.createPayment = async (paymentData) => {
    try {
        const payment = new Payment(paymentData);
        await payment.save();
        logger.info(`Payment created: ${payment._id}`);
        return payment;
    } catch (err) {
        logger.error(`Create payment error: ${err.message}`);
        throw err;
    }
};

exports.getPaymentById = async (paymentId) => {
    try {
        const payment = await Payment.findById(paymentId).populate('orderId').populate('userId', 'name email');
        if (!payment) {
            const error = new Error('Payment not found');
            error.statusCode = 404;
            throw error;
        }
        return payment;
    } catch (err) {
        logger.error(`Get payment error: ${err.message}`);
        throw err;
    }
};

exports.getPaymentByOrderId = async (orderId) => {
    try {
        const payment = await Payment.findOne({ orderId }).populate('orderId').populate('userId', 'name email');
        if (!payment) {
            const error = new Error('Payment not found');
            error.statusCode = 404;
            throw error;
        }
        return payment;
    } catch (err) {
        logger.error(`Get payment by order error: ${err.message}`);
        throw err;
    }
};

exports.updatePaymentStatus = async (paymentId, status) => {
    try {
        const validStatuses = ['pending', 'completed', 'failed', 'refunded'];
        if (!validStatuses.includes(status)) {
            const error = new Error('Invalid status');
            error.statusCode = 400;
            throw error;
        }

        const payment = await Payment.findByIdAndUpdate(paymentId, { status }, { new: true });
        logger.info(`Payment status updated: ${paymentId} - ${status}`);
        return payment;
    } catch (err) {
        logger.error(`Update payment status error: ${err.message}`);
        throw err;
    }
};

exports.getUserPayments = async (userId) => {
    try {
        const payments = await Payment.find({ userId }).populate('orderId').sort({ createdAt: -1 });
        return payments;
    } catch (err) {
        logger.error(`Get user payments error: ${err.message}`);
        throw err;
    }
};

exports.getAllPayments = async () => {
    try {
        const payments = await Payment.find().populate('orderId').populate('userId', 'name email').sort({ createdAt: -1 });
        return payments;
    } catch (err) {
        logger.error(`Get all payments error: ${err.message}`);
        throw err;
    }
};
