const http = require(`http`);

const server = http.createServer((req, res) => {
    // baca req dari browser
    const bacaUrl = new URL(req.url, `http://${req.headers.host}`);
    const path = bacaUrl.pathname;
    const method = req.method;

    // logic res tipe
    res.setHeader(`Access-Control-Allow-Origin`, `*`);
    res.setHeader("content-type", "application/json");

    // logic ambil nama url
    const cariNama = bacaUrl.searchParams.get(`nama`);
    const cetakNama = (nama) => {
        res.writeHead(200);
        res.end(JSON.stringify({ greeting: `Halo ${nama}, selamat berbelanja!` }))
    }

    // logic res
    if (path === `/` && method === `GET`) {
        res.writeHead(200);
        res.end(JSON.stringify({ message: `Selamat datang di toko online kamu!` }));
    } else if (path === `/produk` && method === `GET`) {
        res.writeHead(200);
        res.end(JSON.stringify({ product: [`Laptop`, `Mouse`, `Keyboard`] }));
    } else if (path === `/sapa` && method === `GET` && cariNama !== null) {
        cetakNama(cariNama);
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: `Maaf, halaman tidak ditemukan` }));
    }
});

// start server
const port = 3000;
server.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
})