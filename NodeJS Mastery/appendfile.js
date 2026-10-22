const fs = require(`fs`);
const logger = require(`./logging (Latihan 1)`);

const pesanBaru = `Transaksi berhasil: Rp.600.000\n`;

// cara lama (pakai callback)
// fs.appendFile(`riwayat.txt`, pesanBaru, `utf-8`, (err) => {
//     if (err) {
//         console.error(`Gagal menambahkan file ${err.message}`);
//         return;
//     }

//     console.log(`Berhasil menambahkan file`);
// })

// cara terbaru (.promises) 
const tambahPesan = async () => {
    try {
        const prosesPesan = await fs.promises.appendFile(`riwayat2.txt`, pesanBaru, `utf-8`)
        console.log(`Berhasil menambahkan file`);

        // aku tes logging di file ini, jadi setiap ada append, makan akan disimpan di folder log dengna file app.log
        logger.info(`Transaksi Baru`, {message: `Berhasil menambahkan file`});
    }
    catch (err) {
        console.error(`Gagal menambahkan file ${err.message}`);
        logger.error(`Transaksi Gagal`, {message: `Gagal menambahkan file ${err.message}`});
    }
}
tambahPesan();