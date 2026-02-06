const paymentService = require('../services/paymentService');
const logger = require('../utils/logger');

exports.createPayment = async (req, res) => {
    try {
        const paymentData = { ...req.body, userId: req.user.id };
        const payment = await paymentService.createPayment(paymentData);
        res.status(201).json({ message: 'Payment created successfully', payment });
    } catch (err) {
        logger.error(err.message);
        res.status(err.statusCode || 500).json({ msg: err.message });
    }
};

exports.getPayment = async (req, res) => {
    try {
        const payment = await paymentService.getPaymentById(req.params.id);
        res.json(payment);
    } catch (err) {
        logger.error(err.message);
        res.status(err.statusCode || 500).json({ msg: err.message });
    }
};

exports.getPaymentByOrder = async (req, res) => {
    try {
        const payment = await paymentService.getPaymentByOrderId(req.params.orderId);
        res.json(payment);
    } catch (err) {
        logger.error(err.message);
        res.status(err.statusCode || 500).json({ msg: err.message });
    }
};

exports.getUserPayments = async (req, res) => {
    try {
        const payments = await paymentService.getUserPayments(req.user.id);
        res.json(payments);
    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ msg: err.message });
    }
};

exports.updatePaymentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const payment = await paymentService.updatePaymentStatus(req.params.id, status);
        res.json({ message: 'Payment status updated successfully', payment });
    } catch (err) {
        logger.error(err.message);
        res.status(err.statusCode || 500).json({ msg: err.message });
    }
};

exports.getAllPayments = async (req, res) => {
    try {
        const payments = await paymentService.getAllPayments();
        res.json(payments);
    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ msg: err.message });
    }
};
