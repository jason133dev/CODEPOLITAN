const fs = require(`fs`);

// sync (tidak direkomendasikan)
try {
    const data = fs.readFileSync(`catatan.txt`, `utf-8`);
    console.log(`isi file: ${data}`);
}
catch (err) {
    console.log(`Gagal membaca file: ${err.message}`);
}

// --------------------------------------------------------------------------------------------------------

// async (direkomendasikan)
// 1. metode callback (jadul)
fs.readFile(`catatan.txt`, `utf-8`, (err, data) => {
    if (err) {
        console.error(`Gagal membaca file: ${err.message}`)
        return;
    }

    console.log(`isi file: ${data}`);
})

// 2. metode async (butuh .promises karena modul `fs` itu semuanya dibuat berdasarkan callback)
const bacaFile = async () => {
    try {
        const data = await fs.promises.readFile(`catatan.txt`, `utf-8`)
        console.log(`isi file: ${data}`);
    }
    catch (err) {
        console.log(`Gagal membaca file: ${err.message}`);
    }
}
bacaFile();