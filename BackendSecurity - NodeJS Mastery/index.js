// ------------------------------------- npm import -------------------------------------

import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cowsay from 'cowsay';

// ------------------------------------- middleware import -------------------------------------

import cors from './middleware/cors.js';
import validatorAndSanitize from './middleware/validatorAndSanitize.js';
import hash from './middleware/hashing.js';
import dataBase from './middleware/database.js';
import authJwt from './middleware/authJwt.js';

// ------------------------------------- env -------------------------------------

const port = process.env.PORT;

// ------------------------------------- app setup -------------------------------------

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------------------------------------- req and res management -------------------------------------

// req and res dengan cors dev
app.get(`/`, cors.corsDev, (req, res) => {
    res.status(200).json({
        message: `Backend Security Demo`,
        MateriBelajar: 'cors, validator and sanitization, auth, hashing'
    });
});

// cors
app.get('/test-cors', cors.corsDefault, (req, res) => {
    res.status(200).json({
        message: 'CORS is running',
        origin: req.headers.origin,
        time: `${new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} || ${new Date().toLocaleDateString('en-GB')}`
    });
});

// auth + validator + sanitize + hash + dataBasePost
app.post('/register', cors.corsDefault, validatorAndSanitize.sanitizeAndValidateRegister, hash.hashingPasswordRegister, dataBase.postDataBaseRegister, (req, res) => {
    res.status(200).json({
        message: 'data has been send to database',
        data: req.body,
        timeRegister: `${new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} || ${new Date().toLocaleDateString('en-GB')}`
    });
});

// auth + validator + sanitize + dataBaseLogin
app.post(`/login`, cors.corsDefault, validatorAndSanitize.sanitizeAndValidateLogin, dataBase.postDataBaselogin, authJwt.generateToken, (req, res) => {
    res.status(200).json({
        message: req.body.message,
        lastLogin: req.body.lastLogin,
        role: req.body.role,
        token: req.body.token
    });
});

// cors + dataBAseGet
app.get('/database', cors.corsDefault, dataBase.getDataBase);

// ------------------------------------- server listen -------------------------------------

// listen
app.listen(port, () => {
    console.log(
        cowsay.say({
            text: `Server running on http://localhost:${port}`,
            e: `oo`,
            T: `U`
        })
    );
});