const express = require('express');
const adminAuth = require('../middleware/adminAuth');
const adminController = require('../controllers/adminController');

const router = express.Router();

// All admin routes are protected by admin authentication middleware
router.use(adminAuth);

// Dashboard
router.get('/dashboard/stats', adminController.getDashboardStats);

// User Management
router.get('/users', adminController.getAllUsers);
router.get('/users/:userId', adminController.getUserDetails);
router.put('/users/:userId/status', adminController.updateUserStatus);
router.delete('/users/:userId', adminController.deleteUser);
router.put('/users/:userId/promote', adminController.promoteToAdmin);

// Order Management
router.get('/orders', adminController.getAllOrders);
router.put('/orders/:orderId/status', adminController.updateOrderStatus);

// Product Management
router.get('/products', adminController.getAllProducts);
router.delete('/products/:productId', adminController.deleteProduct);

// Analytics
router.get('/analytics/revenue', adminController.getRevenueAnalytics);

// Logs
router.get('/logs', adminController.getSystemLogs);

module.exports = router;
