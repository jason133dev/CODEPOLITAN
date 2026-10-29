console.log(`1. Mulai Eksekusi`);

console.log(`2. Ini kode sinkron`);

setTimeout(() => {
    console.log(`Timeout 0 detik selesai`);
}, 0);

new Promise((resolve, rejects) => {
    resolve(console.log(`Promise Selesai`));
});

console.log(`Akhir kode sinkron`);