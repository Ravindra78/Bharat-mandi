const Order = require('../models/Order');
const Product = require('../models/Product');
const logger = require('../utils/logger');

exports.createOrder = async (orderData) => {
    try {
               for (let item of orderData.items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                const error = new Error(`Product ${item.productId} not found`);
                error.statusCode = 404;
                throw error;
            }
            if (product.quantity < item.quantity) {
                const error = new Error(`Insufficient quantity for product ${product.name}`);
                error.statusCode = 400;
                throw error;
            }
        }

        const order = new Order(orderData);
        await order.save();
        await order.populate('items.productId');
        logger.info(`Order created: ${order._id}`);
        return order;
    } catch (err) {
        logger.error(`Create order error: ${err.message}`);
        throw err;
    }
};

exports.getOrderById = async (orderId) => {
    try {
        const order = await Order.findById(orderId).populate('buyerId', 'name email').populate('items.productId');
        if (!order) {
            const error = new Error('Order not found');
            error.statusCode = 404;
            throw error;
        }
        return order;
    } catch (err) {
        logger.error(`Get order error: ${err.message}`);
        throw err;
    }
};

exports.getUserOrders = async (userId) => {
    try {
        const orders = await Order.find({ buyerId: userId }).populate('items.productId').sort({ createdAt: -1 });
        return orders;
    } catch (err) {
        logger.error(`Get user orders error: ${err.message}`);
        throw err;
    }
};

exports.updateOrderStatus = async (orderId, status) => {
    try {
        const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            const error = new Error('Invalid status');
            error.statusCode = 400;
            throw error;
        }

        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        logger.info(`Order status updated: ${orderId} - ${status}`);
        return order;
    } catch (err) {
        logger.error(`Update order status error: ${err.message}`);
        throw err;
    }
};

exports.updatePaymentStatus = async (orderId, paymentStatus, paymentId) => {
    try {
        const order = await Order.findByIdAndUpdate(
            orderId,
            { paymentStatus, paymentId },
            { new: true }
        );
        logger.info(`Payment status updated: ${orderId} - ${paymentStatus}`);
        return order;
    } catch (err) {
        logger.error(`Update payment status error: ${err.message}`);
        throw err;
    }
};

exports.cancelOrder = async (orderId) => {
    try {
        const order = await Order.findByIdAndUpdate(orderId, { status: 'cancelled' }, { new: true });
        logger.info(`Order cancelled: ${orderId}`);
        return order;
    } catch (err) {
        logger.error(`Cancel order error: ${err.message}`);
        throw err;
    }
};

exports.getAllOrders = async () => {
    try {
        const orders = await Order.find().populate('buyerId', 'name email').populate('items.productId').sort({ createdAt: -1 });
        return orders;
    } catch (err) {
        logger.error(`Get all orders error: ${err.message}`);
        throw err;
    }
};
