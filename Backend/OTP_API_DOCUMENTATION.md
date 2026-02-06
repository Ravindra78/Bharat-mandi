# OTP API Documentation

## Overview
The OTP (One-Time Password) API provides secure services for user verification via email and SMS. All OTP requests are protected with rate limiting and expiry mechanisms.

---

## OTP Features
- **OTP Generation**: 6-digit random OTP codes
- **Multi-channel Support**: Email and SMS delivery
- **Rate Limiting**: Maximum 5 OTP requests per user
- **Expiry Management**: 10-minute OTP expiry time
- **Status Tracking**: Verification status monitoring

---

## API Endpoints

### 1. Send OTP via Email
**Endpoint**: `POST /api/users/otp/send-email`

**Description**: Generate and send OTP to user's email address

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Response (Success - 200)**:
```json
{
  "message": "OTP sent successfully to your email",
  "otpExpiry": "2026-02-06T11:45:30.000Z"
}
```

**Response (Error - 404)**:
```json
{
  "msg": "User not found"
}
```

**Response (Error - 429)**:
```json
{
  "msg": "Too many OTP requests. Please try again later."
}
```

---

### 2. Send OTP via SMS
**Endpoint**: `POST /api/users/otp/send-sms`

**Description**: Generate and send OTP to user's phone number

**Request Body**:
```json
{
  "phone": "+919876543210"
}
```

**Response (Success - 200)**:
```json
{
  "message": "OTP sent successfully to your phone",
  "otpExpiry": "2026-02-06T11:45:30.000Z"
}
```

**Response (Error - 404)**:
```json
{
  "msg": "User not found"
}
```

---

### 3. Verify OTP
**Endpoint**: `POST /api/users/otp/verify`

**Description**: Verify OTP code and mark user as verified. This endpoint marks the OTP as successfully verified and clears it from the system.

**Request Body**:
```json
{
  "email": "user@example.com",
  "otpCode": "123456"
}
```

**Response (Success - 200)**:
```json
{
  "message": "OTP verified successfully",
  "isVerified": true
}
```

**Response (Error - 400)**:
```json
{
  "msg": "Invalid OTP. Please try again."
}
```

**Response (Error - 400)**:
```json
{
  "msg": "OTP has expired. Please request a new OTP."
}
```

**Response (Error - 404)**:
```json
{
  "msg": "User not found"
}
```

---

### 4. Validate OTP
**Endpoint**: `POST /api/users/otp/validate`

**Description**: Validate OTP code without marking it as verified. Useful for intermediate validation steps.

**Request Body**:
```json
{
  "email": "user@example.com",
  "otpCode": "123456"
}
```

**Response (Success - 200)**:
```json
{
  "isValid": true,
  "message": "OTP verified successfully."
}
```

**Response (Error - 400)**:
```json
{
  "msg": "Invalid OTP. Please try again."
}
```

**Response (Error - 400)**:
```json
{
  "msg": "OTP has expired. Please request a new OTP."
}
```

---

### 5. Check OTP Verification Status
**Endpoint**: `GET /api/users/otp/status/:email`

**Description**: Check if a user has completed OTP verification

**Parameters**:
- `email` (URL parameter): User's email address

**Example**: `/api/users/otp/status/user@example.com`

**Response (Success - 200)**:
```json
{
  "email": "user@example.com",
  "isOtpVerified": true
}
```

**Response (Success - 200)**:
```json
{
  "email": "user@example.com",
  "isOtpVerified": false
}
```

---

## Error Codes

| Status | Code | Message |
|--------|------|---------|
| 400 | Bad Request | Invalid OTP or missing required fields |
| 404 | Not Found | User not found |
| 429 | Too Many Requests | Rate limit exceeded (more than 5 OTP requests) |
| 500 | Internal Server Error | Server error while processing OTP |

---

## Usage Flow

### Registration Flow with OTP Verification
```
1. User calls: POST /api/users/register
   - Registers with email, password, phone, name

2. User calls: POST /api/users/otp/send-email
   - OTP sent to email
   - Response includes otpExpiry time

3. User receives OTP in email

4. User calls: POST /api/users/otp/verify
   - Verifies OTP code
   - After successful verification, isOtpVerified = true

5. User calls: GET /api/users/otp/status/:email
   - Confirms verification status
```

### Login with OTP Verification
```
1. User calls: POST /api/users/login
   - Login with email and password

2. If OTP verification is required:
   a. Call: POST /api/users/otp/send-email
   b. User receives OTP
   c. Call: POST /api/users/otp/verify
   d. Proceed with authenticated access
```

### Additional Verification (without marking verified)
```
1. User calls: POST /api/users/otp/send-email
   - OTP sent

2. User calls: POST /api/users/otp/validate
   - Validates OTP without marking as verified
   - Useful for multi-step verification
```

---

## Rate Limiting

The OTP system implements rate limiting to prevent abuse:
- **Max OTP Requests**: 5 per user
- **Error Code**: 429 (Too Many Requests)
- **Reset**: Counter resets after successful verification

---

## OTP Expiry

- **Default Expiry**: 10 minutes from generation
- **After Expiry**: OTP becomes invalid and cannot be verified
- **Action Required**: User must request a new OTP

---

## Security Considerations

1. **OTP Generation**: 6-digit random codes (1,000,000 possibilities)
2. **Expiry Protection**: Automatically expires after 10 minutes
3. **Rate Limiting**: Maximum 5 requests per user to prevent brute force
4. **Attempt Tracking**: System tracks and limits verification attempts
5. **Email Security**: OTP sent via secure email service
6. **SMS Security**: OTP sent via secure SMS gateway (requires SMS service integration)

---

## Database Fields

The User model includes OTP-related fields:

```
- otpCode (String): The generated OTP code
- otpExpiry (Date): Expiry timestamp of OTP
- isOtpVerified (Boolean): Verification status
- otpAttempts (Number): Number of OTP requests for rate limiting
```

---

## Integration Examples

### Example 1: Send OTP and Verify
```bash
# Step 1: Send OTP
curl -X POST http://localhost:5000/api/users/otp/send-email \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com"}'

# Step 2: Verify OTP (after user receives OTP code)
curl -X POST http://localhost:5000/api/users/otp/verify \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "otpCode": "123456"}'
```

### Example 2: Validate OTP Multiple Times
```bash
# Send OTP
curl -X POST http://localhost:5000/api/users/otp/send-email \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com"}'

# Validate OTP (can be called multiple times)
curl -X POST http://localhost:5000/api/users/otp/validate \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "otpCode": "123456"}'

# Verify OTP (marks as verified, clears OTP)
curl -X POST http://localhost:5000/api/users/otp/verify \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "otpCode": "123456"}'
```

### Example 3: Check Verification Status
```bash
# Check if user has verified OTP
curl -X GET http://localhost:5000/api/users/otp/status/user@example.com
```

---

## Configuration

To use SMS feature, set the following environment variables:
```
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_number
```

Email configuration (already set in emailSender.js):
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| OTP not received | Check email spam folder, verify email address, check SMS service integration |
| OTP expired | Request a new OTP using send-email or send-sms endpoint |
| Too many requests | Wait before requesting new OTP, limit is 5 per user |
| Invalid OTP error | Ensure OTP code is entered correctly without extra spaces |

---

## Future Enhancements

1. WhatsApp OTP delivery
2. Telegram OTP delivery
3. Custom OTP length
4. Custom expiry time
5. OTP history tracking
6. OTP analytics and reporting
7. Biometric-based OTP
8. Push notification OTP
