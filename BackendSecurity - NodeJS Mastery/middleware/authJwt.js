// ------------------------------------- npm import -------------------------------------

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// ------------------------------------- env -------------------------------------

const JWT_SECRET = process.env.JWT_SECRET;

// ------------------------------------- function tool -------------------------------------

const errorCheck = (req) => {
    let error = [];

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) error.push('Access denied, please provide a valid token');

    return error;
};

// ------------------------------------- export module -------------------------------------

const generateToken = (req, res, next) => {
    const payload = {
        email: req.body.email,
        username: req.body.username,
        role: req.body.role
    };

    req.body.token = jwt.sign(payload, JWT_SECRET);

    next();
};

const verifyToken = (req, res, next) => {
    const error = errorCheck(req);
    if (error.length > 0) return res.status(401).json({ errors: error });

    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    try {
        const tokenDecoded = jwt.verify(token, JWT_SECRET);

        const format = {
            email: tokenDecoded.email,
            username: tokenDecoded.username,
            message: 'welcome again to your account'
        }

        req.body.profile = format;

        next();
    } catch (error) {
        return res.status(403).json({ errors: 'your token is inncorrect or expired' });
    }
};

// ------------------------------------- export -------------------------------------

export default { generateToken, verifyToken };