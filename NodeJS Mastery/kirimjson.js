const http = require(`http`);

const server = http.createServer((req, res) => {
    // setHeader itu berfungsi untuk kasih tau browser bahwa ini adalah JSON
    res.setHeader(`content-type`, `application/json`)

    const responData = {
        pesan: `Halo! Ini adalah response JSON dari server...`,
        waktu: new Date().toLocaleDateString(`en-GB`),
        status: `sukses`,
        fitur: [`rooting manual`, `parsing url`, `response JSON`]
    }

    res.writeHead(200)
    res.end(JSON.stringify(responData));
})

const port = 3000;
server.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
})