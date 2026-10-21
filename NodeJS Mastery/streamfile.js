const fs = require(`fs`);

const bacaStream = fs.createReadStream(`Polyester Spiderman Edit (Original by foryouamv).mp4`);
const copyStream = fs.WriteStream(`salinan-video.mp4`);

// mengalirkan data
bacaStream.pipe(copyStream);

// event handilng
copyStream.on(`finish`, () => {
    console.log(`Berhasil menyalin file`);
})

bacaStream.on(`error`, (err) => {
    console.log(`Gagal membaca file ${err}`);
})

copyStream.on(`error`, (err) => {
    console.log(`Gagal menyalin file ${err}`);
})