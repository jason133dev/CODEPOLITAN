// ------------------------------------- npm import -------------------------------------

import validator from 'validator';

// ------------------------------------- function tool -------------------------------------

const errorCheck = (req, res) => {
    let error = [];

    if (!req.body || Object.keys(req.body).length == 0) error.push("No body detected");

    const { email, password, username, confirmPassword } = req.body;
    if (!email || !password || !username || !confirmPassword) error.push("Incorrect or missing key");

    if (email) {
        const check = validator.normalizeEmail(validator.trim(email));
        if (!validator.isEmail(check)) {
            error.push("Format email tidak valid");
        }

        req.body.email = check;
    }

    if (password) {
        const check = validator.trim(password);
        if (!validator.isStrongPassword(password)) {
            error.push("Password terlalu lemah");
        }

        req.body.password = check;
    }

    if (username) {
        const check = validator.escape(validator.trim(username));
        
        req.body.username = check;
    }

    if (confirmPassword) {
        const check = validator.trim(confirmPassword);
        if (check !== password) error.push("Password tidak sama");
    }

    return error;
};

// ------------------------------------- export module -------------------------------------

const sanitizeAndValidateRegister = (req, res, next) => {
    const error = errorCheck(req, res);
    if (error.length > 0) return res.status(400).json({ errors: error });

    console.log('-------------------------------------\n sanitize and validate done \n-------------------------------------');

    next();
};

// ------------------------------------- export -------------------------------------

export default { sanitizeAndValidateRegister };