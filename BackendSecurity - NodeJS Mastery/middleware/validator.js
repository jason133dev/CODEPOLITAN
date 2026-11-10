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

const validateRequire = (fields, data) => {
    const missing = [];

    fields.forEach((e) => {
        if (!data[e] || data[e].toString().trim() === ``) {
            missing.push(e);
        }
    });

    return missing;
};

// ---------------------------------------------------------------------

export default { isValidEmail, isValidPassword, isValidUserName, isValidPhone, validateRequire };