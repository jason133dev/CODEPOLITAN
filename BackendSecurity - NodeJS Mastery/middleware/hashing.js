// ------------------------------------- npm import -------------------------------------

import bcrypt from 'bcrypt';

// ------------------------------------- export module -------------------------------------

const hashingPassword = async (req, res, next) => {
    try {
        const { password } = req.body
        const hash = await bcrypt.hash(password, 10);

        // create new key
        req.body.hashedPassword = hash;
        console.log('-------------------------------------\n password has been hashed \n-------------------------------------');

        next();
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error during password hashing' });
    }
};

// ------------------------------------- export -------------------------------------

export default { hashingPassword };