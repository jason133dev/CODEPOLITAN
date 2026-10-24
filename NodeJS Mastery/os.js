const os = require(`os`);

// lihat sistem operasi (os)
console.log(os.platform());
// lihat arsitektur cpu
console.log(os.arch());

// lihat core cpu
const cpus = os.cpus()
console.log(`CPU ${cpus.length} core`);
// lihat model yang digunakan disetiap core
console.log(`Model: ${cpus[0].model}`);