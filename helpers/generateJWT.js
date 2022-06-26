/*
*   jsonwebtoken is synchronous... so we make a Promise.
*/

const jwt = require('jsonwebtoken');

const generateJWT = (uuid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uuid };
        jwt.sign(payload, process.env.SECRET, { expiresIn: '4h' }, (err, token) => {
            if (err) {
                console.log(err);
                // eslint-disable-next-line prefer-promise-reject-errors
                reject('Can\'t generate token');
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generateJWT
};
