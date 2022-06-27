const { request } = require('express');
const { response } = require('express');
const { googleVerify } = require('../helpers/googleVerify');
const { setUser, getUserByEmail } = require('../services/users');
const { generateJWT } = require('../helpers/generateJWT');

const googleSignIn = async (req = request, res = response) => {
    const { id_token: idToken } = req.body;

    try {
        let newUser;
        const { name, picture, email } = await googleVerify(idToken);
        // Validar si el usuario existe.
        const user = await getUserByEmail(email);
        if (user.length === 0) {
            newUser = await setUser({ name, picture, email, google: true });
        }
        const token = await generateJWT(newUser);
        res.json({
            msg: 'ok',
            email,
            token
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Please contact with administrator'
        })
    }
}

module.exports = {
    googleSignIn
}
