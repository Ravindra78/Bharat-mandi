# OTP Verify - Quick Reference Card

## 🎯 Main Endpoint to Focus On

### Verify OTP
```
POST /api/users/otp/verify
```

**What it does:** Validates OTP code and marks user as verified

---

## 📋 Request Format

```json
{
  "email": "user@example.com",
  "otpCode": "123456"
}
```

| Field | Type | Required | Example |
|-------|------|----------|---------|
| email | String | ✅ Yes | raj@bharatmandi.com |
| otpCode | String | ✅ Yes | 123456 |

---

## ✅ Success Response

**Status Code:** `200 OK`

```json
{
  "message": "OTP verified successfully",
  "isVerified": true
}
```

---

## ❌ Error Responses

### Invalid OTP
**Status Code:** `400 Bad Request`
```json
{
  "msg": "Invalid OTP. Please try again."
}
```

### OTP Expired
**Status Code:** `400 Bad Request`
```json
{
  "msg": "OTP has expired. Please request a new OTP."
}
```

### User Not Found
**Status Code:** `404 Not Found`
```json
{
  "msg": "User not found"
}
```

### Missing Fields
**Status Code:** `400 Bad Request`
```json
{
  "msg": "Email and OTP code are required"
}
```

---

## 🔄 Complete Flow

```
1. User Registration
   └─ POST /api/users/register

2. Send OTP (Choose One)
   ├─ POST /api/users/otp/send-email
   └─ POST /api/users/otp/send-sms

3. User Receives OTP
   └─ Check email or SMS for code

4. VERIFY OTP ⭐ (This Endpoint)
   └─ POST /api/users/otp/verify
   
5. Confirmation (Optional)
   └─ GET /api/users/otp/status/:email
```

---

## 🚀 Usage Examples

### cURL
```bash
curl -X POST http://localhost:5000/api/users/otp/verify \
  -H "Content-Type: application/json" \
  -d '{
    "email": "raj@bharatmandi.com",
    "otpCode": "123456"
  }'
```

### JavaScript (Fetch)
```javascript
fetch('http://localhost:5000/api/users/otp/verify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'raj@bharatmandi.com',
    otpCode: '123456'
  })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));
```

### JavaScript (Axios)
```javascript
axios.post('http://localhost:5000/api/users/otp/verify', {
  email: 'raj@bharatmandi.com',
  otpCode: '123456'
})
.then(res => console.log(res.data))
.catch(err => console.error(err.response.data));
```

### Node.js (Express Controller)
```javascript
const userService = require('../services/userService');

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otpCode } = req.body;
    const result = await userService.verifyOtpCode(email, otpCode);
    res.json(result);
  } catch (err) {
    res.status(err.statusCode || 500).json({ msg: err.message });
  }
};
```

---

## 📊 What Changes in Database After Verification

| Field | Before | After |
|-------|--------|-------|
| `otpCode` | "123456" | `null` |
| `otpExpiry` | Date | `null` |
| `isOtpVerified` | `false` | `true` |
| `otpAttempts` | 3 | 0 |

---

## ⏱️ Important Limits

| Limit | Value |
|-------|-------|
| OTP Validity | 10 minutes |
| OTP Length | 6 digits |
| Max Requests | 5 per user |
| Min/Max Attempts | Unlimited |

---

## 🛡️ Security Facts

- 🔐 **6-digit OTP** = 1,000,000 possibilities
- ⏰ **Auto-expires** after 10 minutes
- 🚫 **Rate limited** - max 5 requests per user
- 🔄 **Clears automatically** after verification
- 📧 **Email verification** included
- 📱 **SMS ready** (configure Twilio)

---

## 📌 Before You Call Verify

### ✅ Prerequisites

1. User must be registered
2. OTP must be sent first (`/otp/send-email` or `/otp/send-sms`)
3. User must receive OTP code
4. OTP must not be expired (within 10 minutes)
5. Email must match registered email

### ❌ Common Mistakes

- Sending verify request without sending OTP first ❌
- Using different email in verify request ❌
- Using wrong/made-up OTP codes ❌
- Trying after 10 minutes expiry ❌
- Not checking error responses ❌

---

## 🎓 Real-World Use Cases

### Registration
```
Register → Send Email OTP → Verify → Successfully Registered
```

### Password Reset
```
Forgot Password → Send Email OTP → Verify → Reset Password
```

### Phone Verification
```
Add Phone → Send SMS OTP → Verify → Phone Verified
```

### Transaction Security
```
High-Value Transaction → Send Email OTP → Verify → Process Payment
```

---

## 🔗 Related Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/otp/send-email` | POST | Send OTP via email |
| `/otp/send-sms` | POST | Send OTP via SMS |
| `/otp/verify` | POST | ⭐ **Verify OTP** |
| `/otp/validate` | POST | Validate (no mark verified) |
| `/otp/status/:email` | GET | Check verification status |

---

## 📞 How It Works Internally

```javascript
// Backend Process When You Call Verify
1. Check if user exists by email
2. Check if OTP code matches stored code
3. Check if OTP is not expired
4. If all pass:
   - Set isOtpVerified = true
   - Set otpCode = null
   - Set otpExpiry = null
   - Reset otpAttempts = 0
   - Save user
   - Return success
5. If any fail:
   - Return specific error message
   - Do NOT clear OTP (allows retry)
```

---

## 🎯 Next Steps After Verification

Once OTP is verified (`isVerified: true`), you can:

1. ✅ Allow user to complete registration
2. ✅ Allow user to reset password
3. ✅ Allow user to verify phone
4. ✅ Process high-value transactions
5. ✅ Grant access to sensitive features

---

## 💡 Tips & Tricks

- **Display OTP expiry time** to user (from response)
- **Auto-hide OTP field** after successful verification
- **Show countdown timer** for OTP expiry (10 minutes)
- **Allow resend OTP** - call send-email again
- **Handle network errors** gracefully
- **Log verification attempts** for security audit

---

## 📖 Documentation Links

- Full OTP Documentation: `OTP_API_DOCUMENTATION.md`
- Complete Usage Guide: `OTP_VERIFY_USAGE_GUIDE.md`
- Backend Code: `controllers/userController.js`
- Services: `services/userService.js`
- Utils: `utils/otpHelper.js`

---

## 🆘 Need Help?

| Problem | Solution |
|---------|----------|
| User says "OTP not received" | Check email spam, verify email is correct |
| Error "User not found" | Register user first via `/register` endpoint |
| Error "Invalid OTP" | Check OTP from email, ensure no extra spaces |
| Error "Too many requests" | Wait, limit is 5 OTP requests per user |
| Error "OTP expired" | Request new OTP via `/send-email` endpoint |

---

**⭐ Remember:** Always send OTP first before calling verify!
