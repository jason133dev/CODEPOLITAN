// npm library
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cowsay from 'cowsay';
import cors from 'cors';

// ----------------------------------------------------------------------------------

// my library
import corsSetting from './middleware/corsSetting.js';
import validator from './middleware/validator.js';

// ----------------------------------------------------------------------------------

// global
const app = express();
const port = process.env.PORT;

// ----------------------------------------------------------------------------------

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ----------------------------------------------------------------------------------

// req and res dengan cors dev
app.get(`/`, cors(corsSetting.corsDev), (req, res) => {
    res.status(200);
    res.json({
        message: `Backend Security Demo`,
        endpoint: {
            cors: `GET/test-cors`,
            sanitization: `POST/sanitize`,
            auth: `GET/protected (Basic Auth)`,
            hashing: `POST/register`
        }
    });
});

// req and res dengan extra pengamanan cors
app.get(`/test-cors`, cors(corsSetting.corsDefault), (req, res) => {
    res.status(200);
    res.json({
        message: `CORS is running`,
        origin: req.headers.origin,
        time: new Date().toLocaleDateString(`en-GB`)
    });
});

// pakai validator untuk register
app.post(`/sanitize/register`, cors(corsSetting.corsDefault), validator.validateRegister, (req, res) => {
    res.status(200);
    res.json({
        message: `Success register new account`,
        data: req.body,
        time: new Date().toLocaleDateString(`en-GB`)
    });
});

// pakai validator untuk register
app.post(`/sanitize/login`, cors(corsSetting.corsDefault), validator.validateLogin, (req, res) => {
    res.status(200);
    res.json({
        message: `Success login to account`,
        data: req.body,
        time: new Date().toLocaleDateString(`en-GB`)
    });
});

// ----------------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------------

// export
export default app;