const fs = require(`fs`).promises;
const path = require(`path`);
// __dirname itu untuk otomatis besisi alamat direktori tempat file javascript ini berada
// logs itu nama folder yang dibuat, app.log itu file hasil
const lokasiFileLog = path.join(__dirname, `logs`, `app.log`);

// pengecek apakah folder yang didalam `lokasiFileLog` sudah ada atau belum, jika tidak ada maka akan di catch
const pastikanFolderLog =  async () => {
    try {
        await fs.access(path.dirname(lokasiFileLog));
    } catch {
        await fs.mkdir(path.dirname(lokasiFileLog), {recursive: true});
    }
};

// pembuat pesan
const log = async (status, message, context = {}) => {
    await pastikanFolderLog();

    const hari = new Date().getDate();
    const bulan = new Date().getMonth();
    const tahun = new Date().getFullYear();

    // cara if yang mode shorthand
    const contextStr = Object.keys(context).length > 0 ? ` | ${JSON.stringify(context)}` :``;

    const pesanLog = `[${hari}/${bulan}/${tahun}] ${status.toUpperCase()} - ${message} ${contextStr}\n`;

    try {
        await fs.appendFile(lokasiFileLog, pesanLog, `utf-8`);
    } catch (err) {
        console.error(`Gagal Menulis File: ${err.message}`)
    }
};

// module (agar bisa dipanggil di file lain dengan .)
const logger = {
    info: (msg, ctx) => log(`info`, msg, ctx),
    warn: (msg, ctx) => log(`warn`, msg, ctx),
    error: (msg, ctx) => log(`error`, msg, ctx)
};

module.exports = logger;