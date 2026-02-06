# OTP Verify - Complete Usage Guide

This guide explains how to integrate and use the OTP Verify functionality across your Bharat Mandi backend.

---

## Table of Contents
1. [Quick Start](#quick-start)
2. [API Endpoints](#api-endpoints)
3. [Step-by-Step Implementation](#step-by-step-implementation)
4. [Real-World Scenarios](#real-world-scenarios)
5. [Code Integration Examples](#code-integration-examples)
6. [Testing with cURL](#testing-with-curl)
7. [Frontend Integration](#frontend-integration)
8. [Error Handling](#error-handling)

---

## Quick Start

### What is OTP Verify?
- **Purpose**: Verify that a user has entered the correct OTP code
- **Functionality**: Validates the OTP and marks the user as verified
- **Endpoint**: `POST /api/users/otp/verify`
- **Success Clears**: OTP code and expiry are removed after verification
- **Marks User**: Sets `isOtpVerified = true` in the database

---

## API Endpoints

### Step 1: Send OTP
```
POST /api/users/otp/send-email
or
POST /api/users/otp/send-sms
```

**Purpose**: Generate and send OTP to user  
**Response**: Returns OTP expiry time

---

### Step 2: Verify OTP ⭐ (Main Focus)
```
POST /api/users/otp/verify
```

**Purpose**: Verify the OTP code entered by user  
**Response**: Marks user as verified and clears OTP

---

### Step 3: Check Status
```
GET /api/users/otp/status/:email
```

**Purpose**: Check if user has verified OTP  
**Response**: Returns `isOtpVerified` status

---

## Step-by-Step Implementation

### Complete OTP Verification Flow

#### Step 1: User Registration
```javascript
// User registers first
POST /api/users/register
Body: {
  "name": "Raj Kumar",
  "email": "raj@bharatmandi.com",
  "password": "password123",
  "phone": "+919876543210"
}

Response: {
  "message": "User registered successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Raj Kumar",
    "email": "raj@bharatmandi.com",
    "phone": "+919876543210"
  }
}
```

#### Step 2: Request OTP (via Email)
```javascript
POST /api/users/otp/send-email
Body: {
  "email": "raj@bharatmandi.com"
}

Response: {
  "message": "OTP sent successfully to your email",
  "otpExpiry": "2026-02-06T11:45:30.000Z"
}

// User receives OTP in email: e.g., 123456
```

#### Step 3: VERIFY OTP ✅
```javascript
POST /api/users/otp/verify
Body: {
  "email": "raj@bharatmandi.com",
  "otpCode": "123456"          // OTP received in email
}

Response: {
  "message": "OTP verified successfully",
  "isVerified": true
}

// Database Update:
// - otpCode: null (cleared)
// - otpExpiry: null (cleared)
// - isOtpVerified: true (marked verified)
// - otpAttempts: 0 (reset)
```

#### Step 4: Confirm Verification (Optional)
```javascript
GET /api/users/otp/status/raj@bharatmandi.com

Response: {
  "email": "raj@bharatmandi.com",
  "isOtpVerified": true
}
```

---

## Real-World Scenarios

### Scenario 1: New User Registration with OTP Verification

```
Timeline:
├─ 14:00 - User fills registration form
├─ 14:01 - POST /api/users/register
├─ 14:02 - POST /api/users/otp/send-email
├─ 14:03 - User opens email and copies OTP
├─ 14:05 - POST /api/users/otp/verify (with OTP)
├─ 14:06 - User completes profile setup
└─ 14:07 - User can login and access account
```

### Scenario 2: Password Reset with OTP Verification

```
POST /api/users/otp/send-email
Body: { "email": "raj@bharatmandi.com" }

// Receives OTP in email

POST /api/users/otp/verify
Body: { 
  "email": "raj@bharatmandi.com",
  "otpCode": "123456"
}

// Once verified, allow password reset
POST /api/users/reset-password (could implement)
Body: {
  "email": "raj@bharatmandi.com",
  "newPassword": "newPassword123"
}
```

### Scenario 3: Adding Phone Number Verification

```
POST /api/users/otp/send-sms
Body: { "phone": "+919876543210" }

// User receives OTP via SMS

POST /api/users/otp/verify
Body: {
  "email": "raj@bharatmandi.com",  // Required field
  "otpCode": "123456"
}

// Phone verified
```

### Scenario 4: Sensitive Transaction Verification

```
// Before processing high-value order/payment
POST /api/users/otp/send-email
Body: { "email": "raj@bharatmandi.com" }

// Show verification popup to user

POST /api/users/otp/verify
Body: {
  "email": "raj@bharatmandi.com",
  "otpCode": "123456"
}

// If verified, proceed with transaction
GET /api/users/otp/status/raj@bharatmandi.com
// Check if isOtpVerified === true
```

---

## Code Integration Examples

### Example 1: Node.js Backend Integration

```javascript
// In your order controller or payment controller
const userService = require('../services/userService');

async function processPaymentWithOTPVerification(req, res) {
  try {
    const { email, otpCode, amount } = req.body;

    // Step 1: Verify OTP before processing payment
    const otpResult = await userService.verifyOtpCode(email, otpCode);
    
    if (!otpResult.isVerified) {
      return res.status(400).json({ 
        msg: 'OTP verification failed. Payment cannot be processed.' 
      });
    }

    // Step 2: OTP verified, proceed with payment
    const paymentResult = await processPayment(email, amount);
    
    res.json({
      message: 'Payment processed successfully',
      paymentResult
    });

  } catch (err) {
    res.status(err.statusCode || 500).json({ msg: err.message });
  }
}
```

### Example 2: Registration Flow with Auto OTP Send

```javascript
// In your registration controller
async function registerUserWithOTP(req, res) {
  try {
    // Step 1: Register user
    const user = await userService.registerUser(req.body);

    // Step 2: Automatically send OTP
    const otpResult = await userService.sendOtpToEmail(req.body.email);

    res.status(201).json({
      message: 'User registered. OTP sent to email.',
      user,
      otpExpiry: otpResult.otpExpiry
    });

  } catch (err) {
    res.status(err.statusCode || 500).json({ msg: err.message });
  }
}
```

### Example 3: Using OTP in Service Layer

```javascript
// services/paymentService.js
const userService = require('./userService');

exports.securePayment = async (email, otpCode, paymentData) => {
  try {
    // Verify OTP before processing
    const otpVerification = await userService.verifyOtpCode(email, otpCode);
    
    if (!otpVerification.isVerified) {
      const error = new Error('OTP verification required');
      error.statusCode = 400;
      throw error;
    }

    // Process payment
    const payment = new Payment(paymentData);
    await payment.save();

    return payment;

  } catch (err) {
    throw err;
  }
};
```

---

## Testing with cURL

### Test 1: Complete OTP Flow

```bash
# 1. Send OTP
curl -X POST http://localhost:5000/api/users/otp/send-email \
  -H "Content-Type: application/json" \
  -d '{"email": "raj@bharatmandi.com"}'

# Response:
# {
#   "message": "OTP sent successfully to your email",
#   "otpExpiry": "2026-02-06T11:45:30.000Z"
# }


# 2. VERIFY OTP (with code from email)
curl -X POST http://localhost:5000/api/users/otp/verify \
  -H "Content-Type: application/json" \
  -d '{"email": "raj@bharatmandi.com", "otpCode": "123456"}'

# Response:
# {
#   "message": "OTP verified successfully",
#   "isVerified": true
# }


# 3. Check verification status
curl -X GET http://localhost:5000/api/users/otp/status/raj@bharatmandi.com

# Response:
# {
#   "email": "raj@bharatmandi.com",
#   "isOtpVerified": true
# }
```

### Test 2: Test Error Scenarios

```bash
# Test with wrong OTP
curl -X POST http://localhost:5000/api/users/otp/verify \
  -H "Content-Type: application/json" \
  -d '{"email": "raj@bharatmandi.com", "otpCode": "000000"}'

# Response:
# {
#   "msg": "Invalid OTP. Please try again."
# }


# Test with expired OTP
# (Wait 10+ minutes after sending, then try to verify)
curl -X POST http://localhost:5000/api/users/otp/verify \
  -H "Content-Type: application/json" \
  -d '{"email": "raj@bharatmandi.com", "otpCode": "123456"}'

# Response:
# {
#   "msg": "OTP has expired. Please request a new OTP."
# }


# Test rate limiting
# (Send OTP 5+ times, then send again)
curl -X POST http://localhost:5000/api/users/otp/send-email \
  -H "Content-Type: application/json" \
  -d '{"email": "raj@bharatmandi.com"}'

# Response (6th attempt):
# {
#   "msg": "Too many OTP requests. Please try again later."
# }
```

---

## Frontend Integration

### Example 1: React Component for OTP Verification

```jsx
import { useState } from 'react';
import axios from 'axios';

function OTPVerification({ email }) {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleVerifyOTP = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await axios.post(
        'http://localhost:5000/api/users/otp/verify',
        {
          email: email,
          otpCode: otp
        }
      );

      setMessage(response.data.message);
      setOtp('');
      
      // After verification, redirect or update state
      if (response.data.isVerified) {
        // Proceed to next step
        window.location.href = '/dashboard';
      }

    } catch (err) {
      setError(err.response?.data?.msg || 'Error verifying OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-verification">
      <h2>Enter OTP</h2>
      <input
        type="text"
        placeholder="Enter 6-digit OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength="6"
        disabled={loading}
      />
      <button 
        onClick={handleVerifyOTP} 
        disabled={loading}
      >
        {loading ? 'Verifying...' : 'Verify OTP'}
      </button>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default OTPVerification;
```

### Example 2: Registration Flow with OTP

```jsx
import { useState } from 'react';
import axios from 'axios';
import OTPVerification from './OTPVerification';

function Register() {
  const [step, setStep] = useState('register'); // 'register' | 'otp' | 'success'
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Register user
      await axios.post('http://localhost:5000/api/users/register', {
        name: formData.name,
        email: email,
        password: formData.password,
        phone: formData.phone
      });

      // Send OTP
      await axios.post('http://localhost:5000/api/users/otp/send-email', {
        email: email
      });

      // Move to OTP verification step
      setStep('otp');

    } catch (err) {
      alert('Registration failed: ' + err.response?.data?.msg);
    } finally {
      setLoading(false);
    }
  };

  if (step === 'otp') {
    return (
      <OTPVerification 
        email={email} 
        onSuccess={() => setStep('success')}
      />
    );
  }

  if (step === 'success') {
    return <h2>✓ Registration Complete!</h2>;
  }

  return (
    <form onSubmit={handleRegister}>
      {/* Registration form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register & Send OTP'}
      </button>
    </form>
  );
}

export default Register;
```

---

## Error Handling

### Common Errors and Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| "User not found" | Email doesn't exist in database | Register user first using `/register` |
| "Invalid OTP" | Wrong OTP code entered | Check OTP in email and try again |
| "OTP has expired" | 10 minutes passed since sending | Request new OTP using `/send-email` |
| "Too many OTP requests" | Exceeded 5 OTP requests | Wait some time before requesting again |
| "Missing email or otpCode" | Request body incomplete | Include both `email` and `otpCode` |

### Error Response Handling in Code

```javascript
async function verifyOtpSafely(email, otpCode) {
  try {
    const response = await axios.post('/api/users/otp/verify', {
      email,
      otpCode
    });

    // Success
    console.log('OTP Verified:', response.data.message);
    return { success: true, data: response.data };

  } catch (error) {
    const statusCode = error.response?.status;
    const errorMsg = error.response?.data?.msg;

    if (statusCode === 400) {
      // Invalid or expired OTP
      console.error('Invalid OTP:', errorMsg);
      return { success: false, error: 'Please check your OTP and try again' };
    } 
    else if (statusCode === 404) {
      // User not found
      console.error('User not found:', errorMsg);
      return { success: false, error: 'User account not found' };
    }
    else if (statusCode === 429) {
      // Rate limited
      console.error('Rate limited:', errorMsg);
      return { success: false, error: 'Too many attempts. Try later.' };
    }
    else {
      // Server error
      console.error('Server error:', errorMsg);
      return { success: false, error: 'Server error. Please try again.' };
    }
  }
}
```

---

## Database Impact

### What Happens When You Verify OTP

**Before Verification:**
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  email: "raj@bharatmandi.com",
  otpCode: "123456",              // ← Contains OTP
  otpExpiry: "2026-02-06T11:45:30.000Z",  // ← Has expiry time
  isOtpVerified: false,           // ← Not verified
  otpAttempts: 3,                 // ← Rate limit counter
  ...otherFields
}
```

**After Calling `/otp/verify` with Correct OTP:**
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  email: "raj@bharatmandi.com",
  otpCode: null,                  // ← Cleared after verification
  otpExpiry: null,                // ← Cleared after verification
  isOtpVerified: true,            // ← Marked as verified
  otpAttempts: 0,                 // ← Reset to 0
  ...otherFields
}
```

---

## Important Rules

### ✅ DO's

1. **Always send OTP first** before calling verify
2. **Use correct email address** in both send and verify calls
3. **Take OTP from email** (not generated by frontend)
4. **Handle errors gracefully** with user-friendly messages
5. **Clear OTP after verification** (handled by backend)
6. **Check status** to confirm verification before proceeding
7. **Reset password** only after OTP verification

### ❌ DON'Ts

1. **Don't hardcode OTP** in frontend code
2. **Don't bypass OTP verification** for testing
3. **Don't send OTP multiple times** without user request
4. **Don't store OTP in plain text** in frontend
5. **Don't expose OTP in logs** or error messages
6. **Don't use expired OTP** - request new one
7. **Don't ignore rate limiting** - respect 5 request limit

---

## Summary

### Quick Reference for Developers

```bash
# 1. Send OTP to user
POST /api/users/otp/send-email
{ "email": "user@example.com" }

# 2. VERIFY OTP (main action)
POST /api/users/otp/verify
{ "email": "user@example.com", "otpCode": "123456" }

# 3. Check if verified (optional)
GET /api/users/otp/status/user@example.com
```

### That's it! 🎉

The OTP Verify system is now ready to use across your entire Bharat Mandi backend for:
- ✅ User Registration
- ✅ Password Reset
- ✅ Account Verification
- ✅ Secure Transactions
- ✅ Sensitive Operations

---

**Need Help?** Check the error handling section or review the real-world scenarios for your use case.
