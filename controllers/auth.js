const { response } = require('express');
const { generateJWT } = require('../helpers/generateJWT');

const login = async (req, res = response) => {
    const { email, password } = req.body;
    // Validate if email/user/password it's ok.

    try {
        const token = await generateJWT('c32d8b45-92fe-44f6-8b61-42c2107dfe87');
        res.json({
            email,
            password,
            token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Please contact with administrator'
        });
    }
}

module.exports = {
    login
}
