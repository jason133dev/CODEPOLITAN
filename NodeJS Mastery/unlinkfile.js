const fs = require(`fs`);

// cara callback
fs.unlink(`catatan.txt`, (err) => {
    if (err) {
        console.error(`Gagal menghapus file ${err.message}`);
        return;
    }

    console.log(`Berhasil menghapus file`);
})

// cara async
const hapusFile = async () => {
    try {
        const prosesDelete = fs.promises.unlink(`catatan2.txt`);
        console.log(`Berhasil menghapus file`);
    }
    catch (err) {
        console.log(`Gagal menghapus file ${err.message}`);
    }
}

hapusFile();