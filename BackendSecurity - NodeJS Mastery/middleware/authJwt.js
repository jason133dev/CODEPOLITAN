// ------------------------------------- npm import -------------------------------------

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// ------------------------------------- env -------------------------------------

const JWT_SECRET = process.env.JWT_SECRET;

// ------------------------------------- databaseToken -------------------------------------

let databaseToken = [];

// ------------------------------------- function tool -------------------------------------

const errorCheckVerify = (req) => {
    let error = [];

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) error.push('Access denied, please provide a valid token');

    return error;
};

const errorCheckTokenLong = (req) => {
    let error = [];

    const { tokenLong } = req.body;
    if (!tokenLong) error.push('No token detected on body');

    const searchTokenLong = databaseToken.includes(tokenLong);
    if (!searchTokenLong) error.push('Long token is not found in database');

    return error;
};

// ------------------------------------- export module -------------------------------------

const generateToken = (req, res, next) => {
    const { email, username, role } = req.body;

    const payload = {
        email: email,
        username: username,
        role: role
    };

    if (role === 'admin') {
        req.body.token = jwt.sign(payload, JWT_SECRET);
    } else {
        const tokenLong = jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });
        databaseToken.push(tokenLong);

        req.body.tokenLong = tokenLong;
        req.body.token = jwt.sign(payload, JWT_SECRET, { expiresIn: '60s' });
    }

    next();
};

const verifyToken = (req, res, next) => {
    const error = errorCheckVerify(req);
    if (error.length > 0) return res.status(401).json({ errors: error });

    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const tokenDecoded = jwt.verify(token, JWT_SECRET);

        const format = {
            message: 'welcome again to your account',
            email: tokenDecoded.email,
            username: tokenDecoded.username,
            role: tokenDecoded.role
        }

        req.body.profile = format;
        console.log('-------------------------------------\n success login to account from jwt  \n-------------------------------------\n\n');

        next();
    } catch (error) {
        return res.status(403).json({ errors: `your token is inncorrect or expired: ${error}` });
    }
};

const tokenLongCheck = (req, res, next) => {
    const error = errorCheckTokenLong(req);
    if (error.length > 0) return res.status(401).json({ errors: error });

    try {
        const { tokenLong } = req.body;
        const tokenLongDecoded = jwt.verify(tokenLong, JWT_SECRET);

        const payload = {
            email: tokenLongDecoded.email,
            username: tokenLongDecoded.username,
            role: tokenLongDecoded.role
        };

        req.body.newToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '60s' });

        next();
    } catch (error) {
        return res.status(403).json({ errors: `your token is inncorrect or expired: ${error}` });
    }
};

// ------------------------------------- export -------------------------------------

export default { generateToken, verifyToken, tokenLongCheck };