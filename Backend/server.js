const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.json({ message: 'Bharat Mandi' });
});

app.get('/health', (req, res) => res.send('OK'));

app.post('/echo', (req, res) => {
	res.json({ youSent: req.body });
});

const api = express.Router();
api.get('/time', (req, res) => res.json({ time: new Date().toISOString() }));
app.use('/api', api);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

