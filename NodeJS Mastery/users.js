const { rejects } = require("assert");
const { resolve } = require("dns");
const http = require(`http`);

// database contoh
let users = [
    { id: 1, nama: `Jason Lee`, email: `67@gmail.com` },
    { id: 2, nama: `Javier Joshi`, email: `76@gmail.com` },
    { id: 3, nama: `Rozak`, email: `rozjak.ganteng@gmail.com` },
    { id: 4, nama: `Sukarno`, email: `sukarno.G30SPKI@gmail.com` }
];

// let akan berubah seiring nextId++ di baris 84
let nextId = 5;

// sendJSON gak perlu return new promise karena ambil datanya dari users yang sudah ada di file ini, kalau nanti database sungguha, baru perlu return new promise
const sendJSON = (res, statusCode, data) => {
    res.writeHead(statusCode, {
        "content-type": "application/json"
    });

    res.end(JSON.stringify(data));
};

// proses req.on(`data`) itu memerlukan waktu, jadi kita perlu awaitkan req.on(`data`) nah cara untuk awaitkan dia gak bisa tulis await req.on(`data`), tapi dengan return new Promises dengan mengandalan awaitnya si resolve
const bacaBody = (req) => {
    return new Promise((resolve, rejects) => {
        let body = ``;

        req.on(`data`, (chunk) => {
            body += chunk.toString();
        });

        // pakai try catch karena untuk mendeteksi jika format JSON pada req POST itu salah
        req.on(`end`, () => {
            try {
                resolve(JSON.parse(body));
            } catch (err) {
                rejects(new Error(`Invalid JSON Format`));
            }
        });
    });
};

// -------------------------------------------------------------------------------------

const server = http.createServer(async (req, res) => {
    res.setHeader("access-control-allow-origin", "*");
    res.setHeader("access-control-allow-mothods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("access-control-allow-headers", "content-type");

    const bacaUrl = new URL(req.url, `http://${req.headers.host}`);
    const path = bacaUrl.pathname;
    const method = req.method;

    if (method === `OPTION`) {
        return res.end()
    }

    if (path === `/users` && method === `GET`) {
        sendJSON(res, 200, users);

        // .startWith() itu hanya mencocokkan bagian awal saja
    } else if (path.startsWith(`/users`) && method === `GET`) {
        // parseInt(path.split(`/`)[2]) ini cara bacanya adalah pisah urlnya berdasarkan `/`
        const id = parseInt(path.split(`/`)[2]);
        // .find berfungsi untuk mencari 1 data spesifik didalam array
        const ambilUser = users.find((e) => {
            e.id === id;
        });

        if (ambilUser) {
            sendJSON(res, 200, ambilUser);
        } else {
            sendJSON(res, 404, { error: `User Tidak Ditemukan` });
        }
    } else if (path === `/users` && method === `POST`) {
        try {
            const data = await bacaBody(req);

            if (!data.nama || !data.email) {
                return sendJSON(res, 404, { error: `Nama dan Email wajib diisi` });
            }

            // ...data untuk ambil seluruh objek didalam variabel data yang isinya body yang berupa JSON
            const newUser = { id: nextId++, ...data };
            users.push(newUser);

            // res.end() itu mirip kayak console.log, tapi di http. gak boleh gak ada res.end, kalau gak bakalan terus loading tanpa henti
            sendJSON(res, 201, newUser);
        } catch (err) {
            sendJSON(res, 400, { error: `Body harus berupa JSON` });
        }
    } else if (path.startsWith(`/users`) && method === `PUT`) {}
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
})