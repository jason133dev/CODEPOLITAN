const login = (password, username) => {
    if (password == `311300` && username == `admin`) {
        console.log(`Sukses Login ${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`);
    } else {
        console.log(`Gagal Masuk`);
    }
}

login(`311300`, `admin`);