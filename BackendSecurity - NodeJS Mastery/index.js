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

// ------------------------------------- app setup -------------------------------------

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------------------------------------- req and res management -------------------------------------

// req and res dengan cors dev
app.get(`/`, cors.corsDev, (req, res) => {
    res.status(200);
    res.json({
        message: `Backend Security Demo`,
        MateriBelajar: 'cors, validator and sanitization, auth, hashing'
    });
});

// cors
app.get('/test-cors', cors.corsDefault, (req, res) => {
    res.status(200);
    res.json({
        message: 'CORS is running',
        origin: req.headers.origin,
        time: new Date().toLocaleDateString('en-GB')
    });
});

// auth + validator + sanitize + dataBasePost
app.post('/protected', cors.corsDefault, validatorAndSanitize.sanitizeAndValidateRegister, hash.hashingPassword, dataBase.postDataBase, (req, res) => {
    res.status(200);
    res.json({
        message: 'data has been send to database',
        data: req.body,
        time: new Date().toLocaleDateString('en-GB')
    });
});

// cors + dataBAseGet
app.get('/protected', cors.corsDefault, dataBase.getDataBase, (req, res) => {
    res.status(200);
});

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

// ------------------------------------- export -------------------------------------

// export
export default app;