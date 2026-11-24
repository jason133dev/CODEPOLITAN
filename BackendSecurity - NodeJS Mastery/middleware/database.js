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

const errorCheckLoginDashboard = (req) => {
    let error = [];
    const tokenDecoded = req.body.tokenDecoded;
    const { email } = tokenDecoded;

    const dataBaseFindEmail = database.find(e => e.email === email);
    if (!dataBaseFindEmail) error.push('cannot find the email');

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

    safeDataBase(req);

    next();
};

const postDataBaselogin = async (req, res, next) => {
    try {
        const error = await errorCheckLogin(req);
        if (error.length > 0) {
            console.log('-------------------------------------\n cannot find email  \n-------------------------------------\n\n');
            return res.status(400).json({ errors: error });
        }

        const { email } = req.body;
        const dataBaseFindEmail = database.find(e => e.email === email);
        dataBaseFindEmail.lastLogin = `${new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} || ${new Date().toLocaleDateString('en-GB')}`;

        req.body.message = 'Welcome to your account';
        req.body.lastLogin = dataBaseFindEmail.lastLogin;
        req.body.role = 'user';

        console.log('-------------------------------------\n success login to account  \n-------------------------------------\n\n');

        next();
    } catch (error) {
        console.log('-------------------------------------\n internal server error during compare password \n-------------------------------------');
        return res.status(500).json({ error: `Internal server error during compare password: ${error}` });
    }
};

const getDashboardLogin = (req, res, next) => {
    const error = errorCheckLoginDashboard(req);
    if (error.length > 0) {
        console.log('-------------------------------------\n cannot find email  \n-------------------------------------\n\n');
        return res.status(400).json({ errors: error });
    }

    const tokenDecoded = req.body.tokenDecoded;
    const { email } = tokenDecoded;

    const dataBaseFindEmail = database.find(e => e.email === email);
    const format = {
        email: dataBaseFindEmail.email,
        username: dataBaseFindEmail.username,
        message: 'welcome again to your account'
    }

    req.body.profile = format;

    next();
};

// ------------------------------------- export -------------------------------------

export default { getDataBase, postDataBaseRegister, postDataBaselogin, getDashboardLogin };