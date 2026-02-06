import React, { useEffect, useState } from 'react';
import { apiFetch } from '../services/api';
import PaymentForm from '../components/FormComponents/PaymentForm';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await apiFetch('/orders/my-orders');
        setOrders(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  const handlePaymentSuccess = (confirmedPayment) => {
    // Update order status locally or refetch
    console.log('Payment confirmed', confirmedPayment);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="border rounded-lg p-4">
            <p><strong>Produce:</strong> {order.listing.produceName}</p>
            <p><strong>Price:</strong> ₹{order.finalPrice}</p>
            <p><strong>Quantity:</strong> {order.quantity} kg</p>
            <p><strong>Status:</strong> {order.status}</p>
            {order.status === 'pending' && (
              <PaymentForm orderId={order._id} amount={order.finalPrice * order.quantity} onSuccess={handlePaymentSuccess} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;