const cors = (req, res, next) => {
    const allowedOrigins = [
        `http://localhost:8080`,
        `http://localhost:3000`,
        `https://yourdomain.com`
    ];

    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader(`Access-Control-Allow-Origin`, origin);
    }

    res.setHeader(`Access-Control-Allow-Credentials`, `true`);
    res.setHeader(`Access-Control-Allow-Methods`, `GET, POST, PUT, DELETE, OPTIONS`);
    res.setHeader(`Access-Control-Allow-Headers`, `Content-type, Authorization, X-Requester-With`);

    if (req.method === `OPTIONS`) {
        return res.sendStatus(204);
    }

    next();
};

// -----------------------------------------------------------------------------------------------

const corsDev = (req, res, next) => {
    res.setHeader(`Access-Control-Allow-Origin`, `*`);
    res.setHeader(`Access-Control-Allow-Methods`, `GET, POST, PUT, DELETE, OPTIONS`);
    res.setHeader(`Access-Control-Allow-Headers`, `Content-type, Authorization, X-Requester-With`);

    if (req.method === `POST`) {
        return res.sendStatus(204);
    }

    next();
};

// -----------------------------------------------------------------------------------------------

export default { cors, corsDev };