const express = require('express');
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

const router = express.Router();

// Protected routes
router.post('/', auth, orderController.createOrder);
router.get('/my-orders', auth, orderController.getUserOrders);
router.get('/:id', auth, orderController.getOrder);
router.put('/:id/status', auth, orderController.updateOrderStatus);
router.put('/:id/cancel', auth, orderController.cancelOrder);
router.get('/user/all', auth, orderController.getAllOrders);

module.exports = router;
