# Bharat Mandi API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
Most endpoints require a JWT token in the header:
```
x-auth-token: <your-jwt-token>
```

## Endpoints

### Users
- **POST** `/users/register` - Register a new user
  - Body: `{ name, email, password, phone }`
  
- **POST** `/users/login` - Login user
  - Body: `{ email, password }`
  
- **GET** `/users/profile` - Get user profile (Protected)
  
- **PUT** `/users/profile` - Update user profile (Protected)
  - Body: `{ name, phone, address, etc }`
  
- **GET** `/users/all` - Get all users (Protected)

### Products
- **GET** `/products` - Get all products
  
- **GET** `/products/:id` - Get product by ID
  
- **GET** `/products/search?query=searchTerm` - Search products
  
- **GET** `/products/category/:category` - Get products by category
  
- **POST** `/products` - Create new product (Protected - Seller)
  - Body: `{ name, description, price, quantity, category, image }`
  
- **PUT** `/products/:id` - Update product (Protected - Seller)
  
- **DELETE** `/products/:id` - Delete product (Protected - Seller)
  
- **GET** `/products/seller/my-products` - Get seller's products (Protected)

### Orders
- **POST** `/orders` - Create order (Protected)
  - Body: `{ items: [{productId, quantity}], shippingAddress }`
  
- **GET** `/orders/my-orders` - Get user's orders (Protected)
  
- **GET** `/orders/:id` - Get order details (Protected)
  
- **PUT** `/orders/:id/status` - Update order status (Protected)
  - Body: `{ status: 'pending|confirmed|shipped|delivered|cancelled' }`
  
- **PUT** `/orders/:id/cancel` - Cancel order (Protected)
  
- **GET** `/orders/user/all` - Get all orders (Protected - Admin)

### Payments
- **POST** `/payments` - Create payment (Protected)
  - Body: `{ orderId, amount, paymentMethod, transactionId }`
  
- **GET** `/payments/my-payments` - Get user's payments (Protected)
  
- **GET** `/payments/:id` - Get payment details (Protected)
  
- **GET** `/payments/order/:orderId` - Get payment by order ID (Protected)
  
- **PUT** `/payments/:id/status` - Update payment status (Protected)
  - Body: `{ status: 'pending|completed|failed|refunded' }`
  
- **GET** `/payments` - Get all payments (Protected - Admin)

## Response Format
All responses return JSON:
```json
{
  "message": "Success message",
  "data": {}
}
```

## Error Handling
Errors return appropriate HTTP status codes with error messages:
```json
{
  "msg": "Error description"
}
```

## Status Codes
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error
