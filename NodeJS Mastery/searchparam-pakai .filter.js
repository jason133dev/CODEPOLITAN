const { error } = require("console");
const http = require(`http`);

const server = http.createServer((req, res) => {
    const bacaUrl = new URL(req.url, `http://${req.headers.host}`);
    const path = bacaUrl.pathname;
    const method = req.method;
    const kategori = bacaUrl.searchParams.get(`kategori`);
    const hargaMax = bacaUrl.searchParams.get(`hargaMax`);

    res.setHeader(`Access-Control-Allow-Origin`, `*`);
    res.setHeader("content-type", "application/json");

    if (path === `/cari` && method === `GET`) {
        if (!kategori) {
            res.writeHead(400);
            return res.end(JSON.stringify({ error: `Parameter kategori wajib diisi` }));
        }

        //.filter  
        const produk = [
            { nama: `Laptop XYZ`, harga: 4500000 },
            { nama: `HP ABC`, harga: 3000000 }
        ].filter((item) => {
            // filter harga max
            if (hargaMax && item.harga > parseInt(hargaMax)) return false
            
            // filter kategori
            // ini bakalan return barang yang cocok dengan kategori, atau akan memunculkan semua barang jika kategori = `semua`
            return item.nama.toLocaleLowerCase().includes(kategori.toLocaleLowerCase()) || kategori === `semua`;
        })

        res.writeHead(200)
        res.end(JSON.stringify({
            kategori: kategori,
            hargaMax: hargaMax,
            data: produk,
            jumlahdata: produk.length
        }))
    } else if (path === `/`) {
        res.writeHead(200);
        res.end(JSON.stringify({
            message: `Coba akses /cari?kategori=laptop&hargaMax=5000000`
        }))
    } else {
        res.writeHead(404)
        res.end(JSON.stringify({error: `Route tidak ditemukan`}))
    }
})

const port = 3000;
server.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
})