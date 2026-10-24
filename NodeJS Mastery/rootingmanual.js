const http = require(`http`);
// kalau pakai new URL, tidak perlu require(`url`) lagi

const server = http.createServer((req, res) => {
    const parseUrl = new URL(req.url, `http://${req.headers.host}`);
    const path = parseUrl.pathname; // /users
    const method = req.method // GET atau POST

    res.setHeader(`Access-Control-Allow-Origin`, `*`);
    res.setHeader("content-type", "application/json");

    if (path === `/` && method === `GET`) {
        res.writeHead(200);
        res.end(JSON.stringify({message: `Selamat datang di server manual`}));
    } else if (path === `/users` && method === `GET`) {
        res.writeHead(200);
        res.end(JSON.stringify({users: [`Rozak`, `Budi`, `Aida`]}));
    } else {
        res.writeHead(404)
        res.end(JSON.stringify({error: `Halaman tidak ditemukan...`}));
    }

    console.log(parseUrl);
    console.log(path);
    console.log(method);
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});