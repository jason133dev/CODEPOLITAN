import validator from 'validator';

// --------------------------------------------------------------------

const sanitizeAndValidateRegister = (req, res, next) => {
    if (req.body) {
        if (req.body.email) {}
        if (req.body.password) {}
        if (req.body.username) {}
        if (req.body.confirmPassword !== req.body.password) {}
    }

    next();
};

// --------------------------------------------------------------------

export default sanitizeAndValidateRegister;