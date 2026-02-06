const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    
    if (!token) {
        return res.status(401).json({ msg: 'No token' });
    }
    
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        logger.error(`Invalid token: ${err.message}`);
        res.status(401).json({ msg: 'Invalid token' });
    }
};