const http = require(`http`);

const server = http.createServer((req, res) => {
    const bacaUrl = new URL(req.url, `http://${req.headers.host}`);
    const path = bacaUrl.pathname;
    const method = req.method;

    if (path === `/success` && method === `GET`) {
        // cara baru (gabungan res.writeHead dan res.setHeader)
        res.writeHead(200, {
            "content-type": "application/json",
            "cache-control": "public, max-age=60"
        });

        res.end(JSON.stringify({ message: `success` }));
    } else if (path === `/created` && method === `POST`) {
        // body logic
        let body = ``
        req.on(`data`, (chunk) => {
            body += chunk.toString();
        });

        // ambil data body
        req.on(`end`, () => {
            const bodyJson = JSON.stringify(body);

            res.writeHead(201, {
                "content-type": "application/json"
            });

            res.end(JSON.stringify({
                time: new Date().toLocaleDateString(`en-GB`),
                data: bodyJson
            }));
        });
    } else {
        res.writeHead(404, {
            "content-type": "application/json"
        });

        res.end(JSON.stringify({
            time: new Date().toLocaleDateString(`en-GB`),
            error: `Not Found`
        }));
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
})