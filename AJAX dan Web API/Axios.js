const panggilData = async () => {
    try {
        const dataApi = await axios.get(`https://dummyjson.com/products/1`);
        console.log(dataApi.data)
    }
    catch(eror) {
        console.log(`eror`)
    }
}

panggilData();