import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Create axios instance with base config
const apiClient = axios.create({
  baseURL: `${API_BASE}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

// User Authentication APIs
export const userAPI = {
  register: (userData) =>
    apiClient.post('/users/register', userData),
  
  login: (email, password) =>
    apiClient.post('/users/login', { email, password }),
  
  getProfile: () =>
    apiClient.get('/users/profile'),
  
  updateProfile: (profileData) =>
    apiClient.put('/users/profile', profileData),

  // Firebase Authentication APIs
  firebaseSignup: (firebaseData) =>
    apiClient.post('/users/firebase-signup', firebaseData),

  firebaseLogin: (firebaseData) =>
    apiClient.post('/users/firebase-login', firebaseData),

  firebaseLoginAuto: (firebaseData) =>
    apiClient.post('/users/firebase-auto-login', firebaseData),
};

// OTP APIs
export const otpAPI = {
  sendEmail: (email, purpose = 'registration') =>
    apiClient.post('/users/otp/send-email', { email, purpose }),
  
  sendSMS: (phone, purpose = 'registration') =>
    apiClient.post('/users/otp/send-sms', { phone, purpose }),
  
  verify: (email, otp) =>
    apiClient.post('/users/otp/verify', { email, otp }),
  
  validate: (email, otp) =>
    apiClient.post('/users/otp/validate', { email, otp }),
  
  checkStatus: (email) =>
    apiClient.get(`/users/otp/status/${email}`),
};

// Product APIs
export const productAPI = {
  getAll: (filters = {}) =>
    apiClient.get('/products', { params: filters }),
  
  getById: (id) =>
    apiClient.get(`/products/${id}`),
  
  create: (productData) =>
    apiClient.post('/products', productData),
  
  update: (id, productData) =>
    apiClient.put(`/products/${id}`, productData),
  
  delete: (id) =>
    apiClient.delete(`/products/${id}`),
};

// Order APIs
export const orderAPI = {
  getAll: () =>
    apiClient.get('/orders'),
  
  getById: (id) =>
    apiClient.get(`/orders/${id}`),
  
  create: (orderData) =>
    apiClient.post('/orders', orderData),
  
  update: (id, orderData) =>
    apiClient.put(`/orders/${id}`, orderData),
  
  delete: (id) =>
    apiClient.delete(`/orders/${id}`),
};

// Payment APIs
export const paymentAPI = {
  getAll: () =>
    apiClient.get('/payments'),
  
  getById: (id) =>
    apiClient.get(`/payments/${id}`),
  
  create: (paymentData) =>
    apiClient.post('/payments', paymentData),
  
  update: (id, paymentData) =>
    apiClient.put(`/payments/${id}`, paymentData),
};

export default apiClient;
