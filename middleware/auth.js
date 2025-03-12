import jwt from 'jsonwebtoken';
import UserAuth from '../models/userAuth.model.js';
const authMiddleware =async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const checkUser=await UserAuth.findOne({email:verified?.email})
        if (!checkUser) {
            return res.status(401).json({ error: 'Access denied. User not found.' });
        }
        if(token===checkUser.token){
            return res.status(401).json({
                error: 'Access denied. Token has expired or is invalid.'
            })
        }
        req.user = verified; // Attach user details to request object
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

export default authMiddleware;
