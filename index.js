require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 8081;
const { validateJWT } = require('./middlewares/validateJWT');

const database = require('./config/db');

(async () => {
    await database.createTables();
})()

/*
const mysql = require('knex')({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'your_database_user',
        password: process.env.DB_PASSWORD || 'your_database_password',
        database: process.env.DB_NAME || 'myapp_test'
    }
});
*/
/*
(async () => {
    const tableName = 'users';
    try {
        await mysql.schema.createTable(tableName, function (table) {
            table.increments();
            table.string('name');
            table.string('email');
            table.string('password');
            table.string('picture');
            table.timestamps();
        });
        console.log(`${tableName} created ok!`);
    } catch (err) {
        console.log(`${tableName} table already exists`);
    }
})();
*/

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/healthcheck', validateJWT, (req, res) => {
    res.json({ msg: 'ok' });
});

app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => {
    console.log(`Server listening in port ${PORT}`);
});
