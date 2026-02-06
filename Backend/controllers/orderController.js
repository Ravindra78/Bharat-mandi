const orderService = require('../services/orderService');
const logger = require('../utils/logger');

exports.createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder({ ...req.body, buyerId: req.user.id });
    res.json(order);
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({ msg: err.message });
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