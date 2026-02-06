const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

const fetchUser = async (req, res, next) => {
    try {
        const token = req.header('auth-token');
        
        if (!token) {
            return res.status(401).json({ error: 'Please provide a valid token' });
        }

        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = fetchUser;