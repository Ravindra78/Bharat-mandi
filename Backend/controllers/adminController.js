const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const logger = require('../utils/logger');

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalOrders = await Order.countDocuments();
        const totalProducts = await Product.countDocuments();
        
        // Count users by role
        const buyerCount = await User.countDocuments({ role: 'buyer' });
        const sellerCount = await User.countDocuments({ role: 'seller' });
        const adminCount = await User.countDocuments({ role: 'admin' });
        
        // Get total revenue
        const completedOrders = await Order.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } }
        ]);
        
        const totalRevenue = completedOrders.length > 0 ? completedOrders[0].totalRevenue : 0;
        
        res.json({
            stats: {
                totalUsers,
                totalOrders,
                totalProducts,
                totalRevenue,
                usersByRole: {
                    buyers: buyerCount,
                    sellers: sellerCount,
                    admins: adminCount
                }
            }
        });
    } catch (err) {
        logger.error(`Dashboard stats error: ${err.message}`);
        res.status(500).json({ msg: 'Error fetching dashboard stats', error: err.message });
    }
};

// Get all users with pagination
exports.getAllUsers = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const role = req.query.role;

        const filter = role ? { role } : {};
        
        const users = await User.find(filter)
            .select('-password')
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: -1 });
        
        const total = await User.countDocuments(filter);
        
        res.json({
            users,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (err) {
        logger.error(`Get all users error: ${err.message}`);
        res.status(500).json({ msg: 'Error fetching users', error: err.message });
    }
};

// Get all orders with pagination
exports.getAllOrders = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const status = req.query.status;

        const filter = status ? { status } : {};
        
        const orders = await Order.find(filter)
            .populate('userId', 'name email phone')
            .populate('products.productId', 'name price')
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: -1 });
        
        const total = await Order.countDocuments(filter);
        
        res.json({
            orders,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (err) {
        logger.error(`Get all orders error: ${err.message}`);
        res.status(500).json({ msg: 'Error fetching orders', error: err.message });
    }
};

// Get all products with pagination
exports.getAllProducts = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const category = req.query.category;

        const filter = category ? { category } : {};
        
        const products = await Product.find(filter)
            .populate('sellerId', 'name email phone')
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: -1 });
        
        const total = await Product.countDocuments(filter);
        
        res.json({
            products,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (err) {
        logger.error(`Get all products error: ${err.message}`);
        res.status(500).json({ msg: 'Error fetching products', error: err.message });
    }
};

// Get user details
exports.getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password');
        
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        
        res.json(user);
    } catch (err) {
        logger.error(`Get user details error: ${err.message}`);
        res.status(500).json({ msg: 'Error fetching user details', error: err.message });
    }
};

// Update user status
exports.updateUserStatus = async (req, res) => {
    try {
        const { isActive } = req.body;
        
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { isActive },
            { new: true }
        ).select('-password');
        
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        
        logger.info(`User ${req.params.userId} status updated to ${isActive}`);
        res.json({ msg: 'User status updated', user });
    } catch (err) {
        logger.error(`Update user status error: ${err.message}`);
        res.status(500).json({ msg: 'Error updating user status', error: err.message });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        
        logger.info(`User ${req.params.userId} deleted`);
        res.json({ msg: 'User deleted successfully' });
    } catch (err) {
        logger.error(`Delete user error: ${err.message}`);
        res.status(500).json({ msg: 'Error deleting user', error: err.message });
    }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        
        const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ msg: 'Invalid order status' });
        }
        
        const order = await Order.findByIdAndUpdate(
            req.params.orderId,
            { status },
            { new: true }
        ).populate('userId', 'name email phone');
        
        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }
        
        logger.info(`Order ${req.params.orderId} status updated to ${status}`);
        res.json({ msg: 'Order status updated', order });
    } catch (err) {
        logger.error(`Update order status error: ${err.message}`);
        res.status(500).json({ msg: 'Error updating order status', error: err.message });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.productId);
        
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        
        logger.info(`Product ${req.params.productId} deleted by admin`);
        res.json({ msg: 'Product deleted successfully' });
    } catch (err) {
        logger.error(`Delete product error: ${err.message}`);
        res.status(500).json({ msg: 'Error deleting product', error: err.message });
    }
};

// Get system logs (basic implementation)
exports.getSystemLogs = async (req, res) => {
    try {
        res.json({
            logs: [
                { timestamp: new Date(), action: 'User registered', user: 'system', status: 'success' },
                { timestamp: new Date(), action: 'Order placed', user: 'buyer_123', status: 'success' },
                { timestamp: new Date(), action: 'Product added', user: 'seller_456', status: 'success' }
            ]
        });
    } catch (err) {
        logger.error(`Get system logs error: ${err.message}`);
        res.status(500).json({ msg: 'Error fetching logs', error: err.message });
    }
};

// Get revenue analytics
exports.getRevenueAnalytics = async (req, res) => {
    try {
        const startDate = req.query.startDate ? new Date(req.query.startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const endDate = req.query.endDate ? new Date(req.query.endDate) : new Date();

        const revenue = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate },
                    status: 'completed'
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    dailyRevenue: { $sum: '$totalAmount' },
                    orderCount: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json({
            period: { startDate, endDate },
            revenue
        });
    } catch (err) {
        logger.error(`Get revenue analytics error: ${err.message}`);
        res.status(500).json({ msg: 'Error fetching analytics', error: err.message });
    }
};

// Promote user to admin
exports.promoteToAdmin = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { role: 'admin' },
            { new: true }
        ).select('-password');
        
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        
        logger.info(`User ${req.params.userId} promoted to admin`);
        res.json({ msg: 'User promoted to admin', user });
    } catch (err) {
        logger.error(`Promote to admin error: ${err.message}`);
        res.status(500).json({ msg: 'Error promoting user', error: err.message });
    }
};
