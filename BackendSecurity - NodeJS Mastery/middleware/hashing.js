// ------------------------------------- npm import -------------------------------------

import bcrypt from 'bcrypt';

// ------------------------------------- export module -------------------------------------

const hashingPasswordRegister = async (req, res, next) => {
    try {
        const { password } = req.body;
        const hash = await bcrypt.hash(password, 10);

        // create new key
        req.body.hashedPassword = hash;
        console.log('-------------------------------------\n password has been hashed \n-------------------------------------');

        next();
    } catch (error) {
        console.log('-------------------------------------\n internal server error during password hashing \n-------------------------------------');
        return res.status(500).json({ error: `Internal server error during password hashing: ${error}` });
    }
};

// ------------------------------------- export -------------------------------------

export default { hashingPasswordRegister };