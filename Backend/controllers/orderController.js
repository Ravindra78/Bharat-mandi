const orderService = require('../services/orderService');
const logger = require('../utils/logger');

exports.createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder({ ...req.body, buyerId: req.user.id });
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (err) {
    logger.error(err.message);
    res.status(err.statusCode || 400).json({ msg: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
    try {
        const orders = await orderService.getUserOrders(req.user.id);
        res.json(orders);
    } catch (err) {
        logger.error(err.message);
        res.status(err.statusCode || 400).json({ msg: err.message });
    }
};

exports.getOrder = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        res.json(order);
    } catch (err) {
        logger.error(err.message);
        res.status(err.statusCode || 400).json({ msg: err.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await orderService.updateOrderStatus(req.params.id, status);
        res.json({ message: 'Order status updated successfully', order });
    } catch (err) {
        logger.error(err.message);
        res.status(err.statusCode || 400).json({ msg: err.message });
    }
};

exports.cancelOrder = async (req, res) => {
    try {
        const order = await orderService.cancelOrder(req.params.id);
        res.json({ message: 'Order cancelled successfully', order });
    } catch (err) {
        logger.error(err.message);
        res.status(err.statusCode || 400).json({ msg: err.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.json(orders);
    } catch (err) {
        logger.error(err.message);
        res.status(err.statusCode || 400).json({ msg: err.message });
    }
};