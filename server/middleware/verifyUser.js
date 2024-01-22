import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

export const verifyUser = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
}