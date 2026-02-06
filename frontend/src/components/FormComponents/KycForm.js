import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { verifyKyc } from '../../redux/actions/authActions';

const KycForm = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyKyc({ aadhaarNumber, otp }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <input type="text" value={aadhaarNumber} onChange={(e) => setAadhaarNumber(e.target.value)} placeholder="Aadhaar Number" className="w-full p-2 border rounded-md" required />
      <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="OTP (use 123456 for demo)" className="w-full p-2 border rounded-md" required />
      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700">Verify KYC</button>
    </form>
  );
};

export default KycForm;