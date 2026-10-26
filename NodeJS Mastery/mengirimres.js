const http = require(`http`);

const server = http.createServer((req, res) => {
    const bacaUrl = new URL(req.url, `http://${req.headers.host}`);
    const path = bacaUrl.pathname;
    const method = req.method;

    res.setHeader(`Access-Control-Allow-Origin`, `*`);
    res.setHeader(`content-type`, `application/json`);

    if (method == `OPTIONS`) {
        res.writeHead(204)
        return res.end()
    } 
    
    if (path === `/submit` && method === `POST`) {   
        let body = ``;

        // ambil data JSON dari post dan diubah menjadi potongan potongan kecil
        // chunk itu sebenarnya bukan hanya menangkap data JSON dari terminal, tapi data biner ,lalu membungkusnya dalam buffer yang kita ganti namanya menjadi chunk
        req.on(`data`, (chunk) => {
            // .toString() itu adalah fungsi yang ada di chunk yang bisa membuat data yang aslinya tadi biner, jadi string
            body += chunk.toString();
            console.log(chunk)
        })

        // req.on(`end`) itu bakalan nyala jika req.(`data`) selesai
        // cek data selesai diterima
        req.on(`end`, () => {
            try {
                const data = JSON.parse(body);

                if (!data.nama || !data.email) {
                    res.writeHead(400)
                    return res.end(JSON.stringify({error: `Nama dan Email Wajib Disini`}));
                }

                console.log(`Data diterima`, data);

                res.writeHead(201);
                res.end(JSON.stringify({
                    pesan: `Data berhasil diterima`,
                    dataYangDikirim: data
                }));
            } catch (err) {
                res.writeHead(400)
                res.end(JSON.stringify({error: `Format JSON tidak valid...`}))
            }
        })
    } else if (path === `/` && method === `GET`) {
        res.writeHead(200);
        res.end(JSON.stringify({
            message: `Server siap diterima data submit`
        }));
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({
            error: `Not Found`
        }));
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});