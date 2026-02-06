const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db/connection');

dotenv.config();

const app = express();

// Connect to database
connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.json({ message: 'Bharat Mandi API' });
});

app.get('/health', (req, res) => res.send('Server is running ❤️'));

app.post('/echo', (req, res) => {
	res.json({ youSent: req.body });
});

const api = express.Router();
api.get('/time', (req, res) => res.json({ time: new Date().toISOString() }));

// Import and use route files
api.use('/users', require('./routes/userRoutes'));
api.use('/products', require('./routes/productRoutes'));
api.use('/orders', require('./routes/orderRoutes'));
api.use('/payments', require('./routes/paymentRoutes'));
api.use('/admin', require('./routes/adminRoutes'));

app.use('/api', api);

// 404 handler
app.use((req, res) => {
	res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: 'Internal server error', error: err.message });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running  on port ${port}`);
});

