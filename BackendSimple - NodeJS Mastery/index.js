require(`dotenv`).config();
const express = require(`express`);
const app = express();
const port = process.env.PORT;
const cowsay = require(`cowsay`);

// --------------------------------------------------------------------

let users = [
    { id: 1, nama: `Jason Lee`, email: `67@gmail.com` },
    { id: 2, nama: `Javier Joshi`, email: `76@gmail.com` },
    { id: 3, nama: `Rozak`, email: `rozjak.ganteng@gmail.com` },
    { id: 4, nama: `Sukarno`, email: `sukarno.G30SPKI@gmail.com` }
];

// --------------------------------------------------------------------

const sendRes = (res, status, data, message) => {
    res.status(status);
    res.json({
        status: status,
        data: data,
        message: message
    });
};

const sendResAd = (res, status, message) => {
    res.status(status);
    res.json({
        status: status,
        data: users,
        message: message
    });
};

// --------------------------------------------------------------------

app.use(express.json());

app.get(`/`, (req, res) => {
    sendRes(res, 200, ``, `Selamat datang ke API Login, coba kirim req POST ke /api/login`)
});

app.post(`/api/login`, (req, res) => {
    // ambil data dari body
    const { nama, email } = req.body;

    // cari user dari database dan return object
    const cariUser = users.find(e => e.nama === nama && e.email === email);
    if (!cariUser) return sendRes(res, 404, ``, `Tidak dapat menemukan akun ${email}`);

    // logic login dengan retrun boolean
    const loginUser = cariUser.nama === nama && cariUser.email === email;

    const ADMIN_NAME = process.env.ADMIN_NAME;
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const loginAdmin = cariUser.nama === ADMIN_NAME && cariUser.email === ADMIN_EMAIL;

    // kirim res
    if (loginAdmin) {
        sendResAd(res, 200, `Selamat datang di dashboard Admin ${email}`);
    } else if (loginUser) {
        sendRes(res, 200, JSON.stringify(cariUser), `Berhasil login ke akun ${email}`);
    }
});

app.get(`/api/dashboard`, (req, res) => {
    const features = [];
    sendRes(res, 200, ``, `Selamat datand di dashboard API`)
});

// --------------------------------------------------------------------

app.listen(port, () => {
    console.log(
        cowsay.say({
            text: `Server running on http://localhost:${port}`,
            e: `oo`,
            T: `U `
        })
    );
});