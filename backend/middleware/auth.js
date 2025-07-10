const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.header('authorization');
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Invalid auth header' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            console.log("no token provided..");
            return res.status(401).json({ success: false, message: 'No token provided' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_Key);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

