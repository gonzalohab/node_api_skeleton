const database = require('../config/db');
const db = database.instance;

const setUser = (user) => {
    return db('users').insert(user)
        .then((res) => res)
        .catch((err) => err)
}

const getUserByEmail = (email) => {
    return db('users').where('email', email)
        .then((res) => res)
        .catch((err) => err)
}
module.exports = {
    setUser,
    getUserByEmail
}
