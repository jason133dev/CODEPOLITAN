const fs = require(`fs`);

const data = JSON.stringify({ pesan: "Hello World", time: new Date() });

// cara lama (pakai callback)
fs.writeFile(`output.json`, data, `utf-8`, (err) => {
    if (err) {
        console.error(`Gagal menulis file ${err.message}`);
        return;
    }

    console.log(`File berhasil disimpan`);
});

// cara terbaru (.promises) 
// `prosesData` tidak akan mengembalikan data apapun (undefined) karena writeFile fungsinya hanya untuk menulis file
const simpanData = async () => {
    try {
        const prosesData = await fs.promises.writeFile(`output2.json`, data, `utf-8`);
        console.log(`File berhasil disimpan`);
    }
    catch (err) {
        console.error(`Gagal menulis file ${err.message}`);
    }
}
simpanData();