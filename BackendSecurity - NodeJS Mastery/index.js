// npm library
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cowsay from 'cowsay';
import cors from 'cors';

// ----------------------------------------------------------------------------------

// my library
import corsSetting from './middleware/corsSetting.js';

// ----------------------------------------------------------------------------------

// global
const app = express();
const port = process.env.PORT;
const corsConfig = corsSetting.corsDefault;
const corsConfigDev = corsSetting.corsDev;

// ----------------------------------------------------------------------------------

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// ----------------------------------------------------------------------------------

// req and res dengan cors dev
app.get(`/`, cors(corsConfigDev), (req, res) => {
    res.status(200);
    res.json({
        message: `Backend Security Demo`,
        endpoint: {
            cors:`GET/test-cors`,
            sanitization: `POST/sanitize`,
            auth: `GET/protected (Basic Auth)`,
            hashing: `POST/register`
        }
    });
});

// req and res dengan extra pengamanan cors
app.get(`/test-cors`, cors(corsConfig), (req, res) => {
    res.status(200);
    res.json({
        message: `CORS is running`,
        origin: req.headers.origin,
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