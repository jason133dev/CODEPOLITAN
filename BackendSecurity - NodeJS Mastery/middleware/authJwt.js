// ------------------------------------- npm import -------------------------------------

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// ------------------------------------- env -------------------------------------

const JWT_SECRET = process.env.JWT_SECRET;

// ------------------------------------- databaseToken -------------------------------------

let databaseToken = [];

// ------------------------------------- function tool -------------------------------------

const errorCheck = (req) => {
    let error = [];

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) error.push('Access denied, please provide a valid token');

    return error;
};

const jwtLogin = (req) => {
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
        // besok lanjut buat endpoint baru untuk login dari token long ini
        req.body.token = jwt.sign(payload, JWT_SECRET, { expiresIn: '60s' });
    }

    next();
};

const verifyToken = (req, res, next) => {
    const error = errorCheck(req);
    if (error.length > 0) return res.status(401).json({ errors: error });

    try {
        jwtLogin(req);

        next();
    } catch (error) {
        return res.status(403).json({ errors: 'your token is inncorrect or expired' });
    }
};

// ------------------------------------- export -------------------------------------

export default { generateToken, verifyToken };