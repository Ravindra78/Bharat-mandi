const express = require('express');
const paymentController = require('../controllers/paymentController');
const auth = require('../middleware/auth');

const router = express.Router();

// Protected routes
router.post('/', auth, paymentController.createPayment);
router.get('/my-payments', auth, paymentController.getUserPayments);
router.get('/:id', auth, paymentController.getPayment);
router.get('/order/:orderId', auth, paymentController.getPaymentByOrder);
router.put('/:id/status', auth, paymentController.updatePaymentStatus);
router.get('/', auth, paymentController.getAllPayments);

module.exports = router;
