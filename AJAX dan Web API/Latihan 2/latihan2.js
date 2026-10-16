// asset
const search = document.querySelector(`#search`);
const search2 = document.querySelector(`#search2`);
const containerImg = document.querySelector(`.container-img`);

// function
const cari = async () => {
    const query = String(search.value).toLowerCase();

    // ambil data api
    if (query !== ``) {
        const dataApi = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);

        // liat isi dataApi
        console.log(dataApi);

        // ambil data
        const dataJson = await dataApi.data;
        let htmlGambar;
        dataJson.forEach((e) => {
            // ambil data gambar dan tampilkan
            let linkGambar = e.show.image?.original;

            if (linkGambar != undefined) {
                htmlGambar = `<img src="${linkGambar}">`;
                containerImg.innerHTML += htmlGambar;
            };
        });

        // tampilan
        search.value = ``;
        search.style.opacity = `0`;
        search2.style.opacity = `1`;
        containerImg.style.opacity = `1`;
    };
};

const cari2 = async () => {
    const query = String(search2.value).toLowerCase();
    // ambil data api

    if (query !== ``) {
        // reset
        containerImg.innerHTML = ``;

        const dataApi = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);

        // liat isi dataApi
        console.log(dataApi);

        // ambil data
        const dataJson = await dataApi.data;
        let htmlGambar;
        dataJson.forEach((e) => {
            // ambil data gambar dan tampilkan
            let linkGambar = e.show.image?.original;

            if (linkGambar != undefined) {
                htmlGambar = `<img src="${linkGambar}">`;
                containerImg.innerHTML += htmlGambar;
            };
        });

        // tampilan
        search2.value = ``;
    };
};

//------------------------------------------------------------------------------

// event
const enter = (e) => {
    if (e.key === `Enter`) {
        try {
            // mulai cari
            cari();
        }

        catch (error) {
            console.log(error)
        }

    }
};

search.addEventListener(`keydown`, enter);

const enter2 = (e) => {
    if (e.key === `Enter`) {
        try {
            // mulai cari
            cari2();
        }

        catch (error) {
            console.log(error)
        }

    }
};

search2.addEventListener(`keydown`, enter2);