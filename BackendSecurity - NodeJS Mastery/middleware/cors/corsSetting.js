const corsDefault = {
    origin: (origin, isAllowed) => {
        const allowedOrigins = [
            `http://localhost:8080`,
            `http://localhost:3000`,
            `https://yourdomain.com`
        ];

        // origin akan kosong jika req datang bukan dari browser (alat tester api, mobile, server lain)
        if (!origin) return isAllowed(null, true);

        // .indexOf() untuk mencari teks atau angka biasa didalam array yang sama persis. Kalau .findIndex(e => ...) itu cari dari object.
        if (allowedOrigins.indexOf(origin) === -1) {
            const message = `The CORS policy for this site does not allow access from the `;
            return isAllowed(new Error(message), false);
        }

        return isAllowed(null, true);
    },
    credentials: true,
    methods: [`GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`],
    allowedHeaders: [`Content-Type`, `Authorization`, `X-Requested-With`],
    status: `Success added CORS Security Default`
};

// --------------------------------------------------------------------------

const corsDev = {
    origin: `*`,
    credentials: true,
    methods: [`GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`],
    allowedHeaders: [`Content-Type`, `Authorization`, `X-Requested-With`],
    status: `Success added CORS Security dev`
};

// ----------------------------------------------------------------------------------

export default { corsDefault, corsDev };