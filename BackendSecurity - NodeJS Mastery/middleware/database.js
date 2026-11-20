// ------------------------------------- database -------------------------------------

let database = [];

// ------------------------------------- function tool -------------------------------------

const safeDataBase = (req) => {
    const { email, hashedPassword, username } = req.body;
    const safeFormat = {
        email: email,
        hashedPassword: hashedPassword,
        username: username
    };

    database.push(safeFormat);
    console.log('-------------------------------------\n safe at database \n-------------------------------------\n\n');
};

const dataBaseCheck = (req) => {
    let error = []
    const { email, username } = req.body;

    const dataBaseCheckEmail = database.some(e => e.email === email);
    const dataBaseCheckUsername = database.some(e => e.username === username);

    if (dataBaseCheckEmail || dataBaseCheckUsername) error.push('Email or username already exists');

    return error;
};

// ------------------------------------- export module -------------------------------------

const getDataBase = (req, res, next) => {
    res.json({ database: database });

    next();
};

const postDataBase = (req, res, next) => {
    const error = dataBaseCheck(req);
    if (error.length > 0) return res.status(400).json({ errors: error });

    safeDataBase(req);

    next();
};

// ------------------------------------- export -------------------------------------

export default { dataBaseCheck, getDataBase, postDataBase };