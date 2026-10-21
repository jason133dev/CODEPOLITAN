const fs = require(`fs`);

const pesanBaru = `Transaksi berhasil: Rp.60.000\n`;

// cara lama (pakai callback)
fs.appendFile(`riwayat.txt`, pesanBaru, `utf-8`, (err) => {
    if (err) {
        console.error(`Gagal menambahkan file ${err.message}`);
        return;
    }

    console.log(`Berhasil menambahkan file`);
})

// cara terbaru (.promises) 
const tambahPesan = async () => {
    try {
        const prosesPesan = await fs.promises.appendFile(`riwayat2.txt`, pesanBaru, `utf-8`)
        console.log(`Berhasil menambahkan file`);
    }
    catch (err) {
        console.error(`Gagal menambahkan file ${err.message}`);
    }
}
tambahPesan();