// npm library
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cowsay from 'cowsay';

// ----------------------------------------------------------------------------------

// middleware
import cors from './middleware/cors.js';
import validator from './middleware/manualVersion/validator.js';
import validatorAndSanitize from './middleware/validatorAndSanitize.js';

// ----------------------------------------------------------------------------------

// global
const app = express();
const port = process.env.PORT;

// ----------------------------------------------------------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ----------------------------------------------------------------------------------

// req and res dengan cors dev
app.get(`/`, cors.corsDev, (req, res) => {
    res.status(200);
    res.json({
        message: `Backend Security Demo`,
        endpoint: {
            cors: `GET/test-cors`,
            validator: `POST/validator`,
            sanitization: `POST/sanitize`,
            auth: `GET/protected (Basic Auth)`,
            hashing: `POST/register`
        }
    });
});

// req and res dengan extra pengamanan cors
app.get(`/test-cors`, cors.corsDefault, (req, res) => {
    res.status(200);
    res.json({
        message: `CORS is running`,
        origin: req.headers.origin,
        time: new Date().toLocaleDateString(`en-GB`)
    });
});

// pakai validator untuk register
app.post(`/validator/register`, validator.validateRegister, (req, res) => {
    res.status(200);
    res.json({
        message: `Success register new account`,
        data: req.body,
        time: new Date().toLocaleDateString(`en-GB`)
    });
});

// pakai validator untuk login
app.post(`/validator/login`, validator.validateLogin, (req, res) => {
    res.status(200);
    res.json({
        message: `Success login to account`,
        data: req.body,
        time: new Date().toLocaleDateString(`en-GB`)
    });
});

// validator + sanitize
app.post(`/validate/sanitize/register`, validatorAndSanitize.sanitizeAndValidateRegister, (req, res) => {
    res.status(200);
    res.json({
        original: req.body,
        sanitized: req.body,
        message: `Data has been cleaned`
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