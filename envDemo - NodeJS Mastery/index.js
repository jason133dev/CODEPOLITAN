require(`dotenv`).config();

const dataPribadi = {
    PORT: process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT,
    API_KEY: process.env.API_KEY,
    NODE_ENV: process.env.NODE_ENV
};

const Json = JSON.stringify(dataPribadi);

console.log(Json);