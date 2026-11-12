const isValidEmail = (email) => {
    const emailRegex = /^([^\s@]+@[^\s@]+\.[^\s@]+)$/;

    return emailRegex.test(email);
};

const isValidPassword = (password) => {
    if (password.length < 8) return false;
    if (!/[a-zA-Z]/.test(password)) return false;
    if (!/[0-9]/.test(password)) return false;

    return true;
};

const isValidUserName = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

    return usernameRegex.test(username);
};

const isValidPhone = (phone) => {
    const phoneRegex = /^[0-9]{10,15}$/;

    return phoneRegex.test(phone);
};

const validateEmpty = (fields, data) => {
    const missing = [];

    // fields berisi array yang memberi tahu data[e] nilai key nya sehingga bisa mengecek datanya berdasarkan key dari fields tersebut
    fields.forEach((e) => {
        if (!data[e] || data[e].toString().trim() === ``) {
            missing.push(e);
        }
    });

    return missing;
};

// ---------------------------------------------------------------------

const validateRegister = (req, res, next) => {
    const errors = [];
    const missing = validateEmpty([`email`, `password`, `username`, `confirmPassword`], req.body);
    const { email, password, username, confirmPassword } = req.body;

    if (missing.length > 0) {
        return res.status(400).json({
            success: false,
            error: `Missing required fields: ${missing.join(`,`)}`
        });
    }

    if (!isValidEmail(email)) {
        errors.push(`Format email tidak valid`);
    }

    if (!isValidPassword(password)) {
        errors.push(`Password kurang dari 7 angka/huruf, dan harus harus menyertakan huruf kapital serta angka`);
    }

    if (!isValidUserName(username)) {
        errors.push(`Username harus 3 - 20 karakter dan hanya huruf, angka dan underscore`);
    }

    if (confirmPassword !== password) {
        errors.push(`Password dan Confirm Password tidak sama`);
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            error: errors
        });
    }

    next();
};

const validateLogin = (req, res, next) => {
    const errors = [];
    const missing = validateEmpty([`email`, `password`], req.body);
    const { email, password } = req.body;

    if (missing.length > 0) {
        return res.status(400).json({
            success: false,
            error: `Missing required fields: ${missing.join(`,`)}`
        });
    }

    if (!isValidEmail(email)) {
        errors.push(`Format email tidak valid`);
    }

    if (!isValidPassword(password)) {
        errors.push(`Password kurang dari 7 angka/huruf, dan harus harus menyertakan huruf kapital serta angka`);
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            error: errors
        });
    }

    next();
};

// ---------------------------------------------------------------------

export default { validateRegister, validateLogin };