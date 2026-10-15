const req = new XMLHttpRequest();

req.onload = () => {
    console.log(JSON.parse(req.response));
};

req.onerror = () => {
    console.log(`Eror`, req);
};

req.open(`GET`, `https://swapi.dev/api/people/1`);

req.send();