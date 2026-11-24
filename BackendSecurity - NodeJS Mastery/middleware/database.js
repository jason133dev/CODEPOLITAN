// ------------------------------------- npm import -------------------------------------

import bcrypt from 'bcrypt';

// ------------------------------------- database -------------------------------------

let database = [
    {
        "email": "leejasoneffect@gmail.com",
        "hashedPassword": "$2b$10$RHtBDp.na5IwKqf33jKTmeoOs9KqzuLr9T93oKr.WmOSC9TZc27hq",
        "username": "zaxon_133",
        "timeRegister": "12:08:08 || 24/11/2026",
        "role": 'admin'
    }
];

// ------------------------------------- function tool -------------------------------------

const safeDataBaseRegister = (req) => {
    const { email, hashedPassword, username } = req.body;
    const safeFormat = {
        email: email,
        hashedPassword: hashedPassword,
        username: username,
        timeRegister: `${new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} || ${new Date().toLocaleDateString('en-GB')}`,
        role: 'user'
    };

    database.push(safeFormat);
    console.log('-------------------------------------\n safe at database \n-------------------------------------\n\n');
};

const DataBaseLogin = (req) => {
    const { email } = req.body;
    const dataBaseFindEmail = database.find(e => e.email === email);
    dataBaseFindEmail.lastLogin = `${new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} || ${new Date().toLocaleDateString('en-GB')}`;

    req.body.message = 'Welcome to your account';
    req.body.lastLogin = dataBaseFindEmail.lastLogin;
    req.body.role = dataBaseFindEmail.role;

    console.log('-------------------------------------\n success login to account  \n-------------------------------------\n\n');
};

const errorCheckRegister = (req) => {
    let error = []
    const { email, username } = req.body;

    const dataBaseCheckEmail = database.some(e => e.email === email);
    const dataBaseCheckUsername = database.some(e => e.username === username);

    if (dataBaseCheckEmail || dataBaseCheckUsername) error.push('email or username or password already exists');

    return error;
};

const errorCheckLogin = async (req) => {
    let error = [];
    const { email, password } = req.body;

    const dataBaseFindEmail = database.find(e => e.email === email);
    if (!dataBaseFindEmail) error.push('cannot find the email');

    const compare = await bcrypt.compare(password, dataBaseFindEmail.hashedPassword);
    if (!compare) error.push('cannot find the password');

    return error;
};

// ------------------------------------- export module -------------------------------------

const getDataBase = (req, res, next) => {
    req.body.database = database;

    next();
};

const postDataBaseRegister = (req, res, next) => {
    const error = errorCheckRegister(req);
    if (error.length > 0) {
        console.log('-------------------------------------\n failed safe at database \n-------------------------------------\n\n');
        return res.status(400).json({ errors: error });
    }

    safeDataBaseRegister(req);

    next();
};

const postDataBaselogin = async (req, res, next) => {
    try {
        const error = await errorCheckLogin(req);
        if (error.length > 0) {
            console.log('-------------------------------------\n cannot find email  \n-------------------------------------\n\n');
            return res.status(400).json({ errors: error });
        }

        DataBaseLogin(req);

        next();
    } catch (error) {
        console.log('-------------------------------------\n internal server error during compare password \n-------------------------------------');
        return res.status(500).json({ error: `Internal server error during compare password: ${error}` });
    }
};

// ------------------------------------- export -------------------------------------

export default { getDataBase, postDataBaseRegister, postDataBaselogin };