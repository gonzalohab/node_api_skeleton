const { response } = require('express');
const { request } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => {
    const token = req.header('x-apikey');
    if (!token) {
        return res.status(401).json({ msg: 'Apikey missing' });
    }

    try {
        jwt.verify(token, process.env.SECRET);
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ msg: 'Invalid Token' });
    }
}

module.exports = { validateJWT }
