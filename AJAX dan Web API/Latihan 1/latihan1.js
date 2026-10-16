// asset
const btn = document.querySelector(`#btn`);
const text = document.querySelector(`#text`);

const summonJokes = async () => {
    try {
        const config = {
            headers: {
                Accept: `application/json`,
            },
        };
        text.style.opacity = `0`;
        const dataJson = await axios.get(`https://icanhazdadjoke.com/`, config);

        setTimeout(() => {
            text.style.opacity = `1`;
            text.innerHTML = `${dataJson.data.joke}`;
        }, 1000);
    }

    catch (error) {
        text.style.opacity = `1`;
        text.innerHTML = `No Jokes Available! ${error}`;
    }
};

btn.addEventListener(`click`, summonJokes);