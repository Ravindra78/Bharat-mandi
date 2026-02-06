import React, { useState } from 'react';
import { apiFetch } from '../../services/api';

const PaymentForm = ({ orderId, amount, onSuccess }) => {
  const [processing, setProcessing] = useState(false);

  const handlePay = async () => {
    setProcessing(true);
    try {
      const payment = await apiFetch('/payments/initiate', {
        method: 'POST',
        body: JSON.stringify({ orderId, amount }),
      });
      // Simulate confirmation
      const confirmed = await apiFetch('/payments/confirm', {
        method: 'POST',
        body: JSON.stringify({ paymentId: payment.paymentId }),
      });
      onSuccess(confirmed);
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <button onClick={handlePay} disabled={processing} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
      {processing ? 'Processing...' : 'Pay Now'}
    </button>
  );
};

export default PaymentForm;