import validator from 'validator';

// --------------------------------------------------------------------

const sanitizeAndValidateRegister = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length == 0) return res.status(400).json({ error: `No body detected` });

    if (req.body) {
        const { email, password, username, confirmPassword } = req.body;

        let error = [];

        if (email) {
            const check = validator.normalizeEmail(validator.trim(email));
            if (!validator.isEmail(check)) {
                error.push("Format email tidak valid");
            } else {
                req.body.email = check;
            }
        }

        if (password) {
            if (!validator.isStrongPassword(password, { minLowercase: 1, minUppercase: 1 })) {
                error.push("Password terlalu lemah");
            }
        }

        if (username) {
            const check = validator.escape(validator.trim(username));
            req.body.username = check;
        }

        if (confirmPassword !== password) {
            error.push("Password tidak sama");
        }

        if (error.length > 0) {
            return res.status(400).json({ errors: error });
        }
    }

    next();
};

// --------------------------------------------------------------------

export default { sanitizeAndValidateRegister };