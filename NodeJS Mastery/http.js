const http = require(`http`);

const server = http.createServer((req, res) => {
    res.writeHead(200, {"content-type": "text/plain"});

    console.log(req.headers);

    res.end(`Data sudah masuk`)
});

server.listen(3000, () => {
    console.log("Server berjalan di http://localhost:3000");
})