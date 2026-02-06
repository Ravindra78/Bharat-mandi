const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    
    if (!token) {
        return res.status(401).json({ msg: 'No token provided' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if user is admin
        if (decoded.role !== 'admin') {
            logger.warn(`Unauthorized admin access attempt by user: ${decoded.id} with role: ${decoded.role}`);
            return res.status(403).json({ msg: 'Access denied. Admin privileges required.' });
        }
        
        req.user = decoded;
        next();
    } catch (err) {
        logger.error(`Invalid token: ${err.message}`);
        res.status(401).json({ msg: 'Invalid token' });
    }
};
