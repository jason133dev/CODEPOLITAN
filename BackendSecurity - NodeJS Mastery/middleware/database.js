// ------------------------------------- npm import -------------------------------------

import bcrypt from 'bcrypt';

// ------------------------------------- database -------------------------------------

let database = [];

// ------------------------------------- function tool -------------------------------------

const safeDataBase = (req) => {
    const { email, hashedPassword, username } = req.body;
    const safeFormat = {
        email: email,
        hashedPassword: hashedPassword,
        username: username,
        timeRegister: `${new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} || ${new Date().toLocaleDateString('en-GB')}`
    };

    database.push(safeFormat);
    console.log('-------------------------------------\n safe at database \n-------------------------------------\n\n');
};

const dataBaseCheckRegister = (req) => {
    let error = []
    const { email, username, hashedPassword } = req.body;

    const dataBaseCheckEmail = database.some(e => e.email === email);
    const dataBaseCheckUsername = database.some(e => e.username === username);
    const dataBaseCheckHashedPassword = database.some(e => e.hashedPassword === hashedPassword);

    if (dataBaseCheckEmail || dataBaseCheckUsername || dataBaseCheckHashedPassword) error.push('email or username or password already exists');

    return error;
};

const dataBaseCheckLogin = (req) => {
    let error = [];
    const { email } = req.body;

    const dataBaseFindEmail = database.some(e => e.email === email);
    if (!dataBaseFindEmail) error.push('cannot find the email');

    return error;
};

// ------------------------------------- export module -------------------------------------

const getDataBase = (req, res, next) => {
    res.json({ database: database });

    next();
};

const postDataBaseRegister = (req, res, next) => {
    const error = dataBaseCheckRegister(req);
    if (error.length > 0) {
        console.log('-------------------------------------\n failed safe at database \n-------------------------------------\n\n');
        return res.status(400).json({ errors: error });
    }

    safeDataBase(req);

    next();
};

const postDataBaselogin = async (req, res, next) => {
    try {
        const error = dataBaseCheckLogin(req);
        if (error.length > 0) {
            console.log('-------------------------------------\n cannot find email  \n-------------------------------------\n\n');
            return res.status(400).json({ errors: error });
        }

        const { email, password } = req.body;
        const dataBaseFindEmail = database.find(e => e.email === email);
        const compare = await bcrypt.compare(password, dataBaseFindEmail.hashedPassword);

        if (!compare) return res.status(400).json({ error: 'cannot find password' });

        console.log('-------------------------------------\n success login to account  \n-------------------------------------\n\n');

        next();
    } catch (error) {
        console.log('-------------------------------------\n internal server error during compare password \n-------------------------------------');
        return res.status(500).json({ error: `Internal server error during compare password: ${error}` });
    }
};

// ------------------------------------- export -------------------------------------

export default { getDataBase, postDataBaseRegister, postDataBaselogin };