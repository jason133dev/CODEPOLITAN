// path ini akan menyesuaikan OS masing masing device yang digunakan
const path = require(`path`);

// path nya hanya bersifat lokal (folder ini saja)
const filepath = path.join(`CODEPOLITAN`, `NodeJS Mastery`, `path.js`);
console.log(filepath);


// path yang bener bener cari dari dasar
const filepathResolve = path.resolve(__dirname);
console.log(filepathResolve);

// bagian path
const fullPath = `CODEPOLITAN/NodeJS Mastery/path.js`;
console.log(path.dirname(fullPath));
console.log(path.basename(fullPath));
console.log(path.extname(fullPath));