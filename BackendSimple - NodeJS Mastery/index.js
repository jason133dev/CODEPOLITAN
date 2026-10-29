const express = require(`express`);
const app = express();
const port = 3000;

let users = [
    { id: 1, nama: `Jason Lee`, email: `67@gmail.com` },
    { id: 2, nama: `Javier Joshi`, email: `76@gmail.com` },
    { id: 3, nama: `Rozak`, email: `rozjak.ganteng@gmail.com` },
    { id: 4, nama: `Sukarno`, email: `sukarno.G30SPKI@gmail.com` }
];

app.use(express.json())

app.get(`/`, (req, res) => {
    res.status(200);
    res.send(`Server is running...`);
});

app.get(`/api/users`, (req, res) => {
    res.status(200);
    res.json({
        status: `success`,
        data: users,
        message: ``
    });
});

app.post(`/api/login`, (req, res) => {
    const { nama, email } = req.body;

    // logic login
    if (nama === `Jason Lee` && email === `67@gmail.com`) {
        res.status(200);
        res.json({
            status: `success`,
            data: ``,
            message: `Berhasil login ke akun ${email}`
        });
    } else {
        res.status(404);
        res.json({
            status: `error`,
            data: ``,
            message: `Tidak dapat menemukan akun ${email}`
        });
    }
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});