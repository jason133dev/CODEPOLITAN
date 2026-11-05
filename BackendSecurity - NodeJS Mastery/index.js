require(`dotenv`).config();
const express = require(`express`);
const app = express();
const port = process.env.PORT;
const cowsay = require(`cowsay`);

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get(`/`, (req, res) => {
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

// export
module.exports = app;