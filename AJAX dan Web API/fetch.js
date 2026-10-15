const panggilData = async () => {
    try {
        const api = await fetch(`https://swapi.dev/api/people/1`);
        const data = await api.json();

        console.log(api)
        console.log(data)
    }

    catch (eror) {
        console.log(`Eror`)
    }
}

panggilData()